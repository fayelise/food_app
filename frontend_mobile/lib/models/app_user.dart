class AppUser {
  final int id;
  final String email;

  AppUser({required this.id, required this.email});

  factory AppUser.fromJson(Map<String, dynamic> json) {
    return AppUser(
      id: json['id'] as int,
      email: json['email'] as String,
    );
  }

  /// Display name shown in the header/profile, mirrors the React app's
  /// `user.email.split('@')[0]`.
  String get displayName => email.split('@').first;
}
