import 'package:flutter/foundation.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../models/app_user.dart';
import '../services/api_service.dart';

/// Mirrors the React AuthContext: holds the JWT (persisted, like
/// localStorage), fetches the current user on token change, and exposes
/// login/logout.
class AuthProvider extends ChangeNotifier {
  static const _tokenKey = 'token';

  AppUser? _user;
  String? _token;
  bool _loading = true;

  AppUser? get user => _user;
  String? get token => _token;
  bool get loading => _loading;
  bool get isAuthenticated => _user != null;

  AuthProvider() {
    _restoreSession();
  }

  Future<void> _restoreSession() async {
    final prefs = await SharedPreferences.getInstance();
    _token = prefs.getString(_tokenKey);
    if (_token == null) {
      _loading = false;
      notifyListeners();
      return;
    }
    await _fetchCurrentUser();
  }

  Future<void> _fetchCurrentUser() async {
    if (_token == null) return;
    _loading = true;
    notifyListeners();
    try {
      final data = await ApiService.me(_token!);
      _user = AppUser.fromJson(data);
    } catch (_) {
      _user = null;
      _token = null;
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_tokenKey);
    } finally {
      _loading = false;
      notifyListeners();
    }
  }

  /// Called after a successful login/register response with a fresh
  /// token. Persists it and fetches /me, same flow as the React app.
  Future<void> setToken(String token) async {
    _token = token;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenKey, token);
    await _fetchCurrentUser();
  }

  Future<void> logout() async {
    _user = null;
    _token = null;
    _loading = false;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenKey);
    notifyListeners();
  }
}
