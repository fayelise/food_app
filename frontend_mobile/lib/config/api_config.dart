import 'dart:io' show Platform;

/// Backend base URL.
///
/// The Express backend runs on your computer at localhost:5000.
/// From inside an emulator/simulator, "localhost" points to the
/// emulator itself, not your computer, so the address differs:
///   - Android emulator -> 10.0.2.2 (special alias to the host machine)
///   - iOS simulator     -> localhost works directly
///
/// If you later switch to a physical device, replace this with your
/// computer's LAN IP (e.g. http://192.168.1.42:5000) and make sure the
/// phone is on the same Wi-Fi network as your computer.
class ApiConfig {
  static String get _host => Platform.isAndroid ? '10.0.2.2' : 'localhost';

  /// Base for JSON API calls, e.g. ApiConfig.apiUrl + '/menu'
  static String get apiUrl => 'http://$_host:5000/api';

  /// Base for static files (menu/topping images), whose paths already
  /// start with "/images/...", e.g. ApiConfig.fileUrl + item.image
  ///
  /// Images are mounted under /api/images on the backend (see
  /// app.use("/api/images", express.static(...)) in server.js), so this
  /// must include the /api segment just like apiUrl does.
  static String get fileUrl => 'http://$_host:5000/api';
}
