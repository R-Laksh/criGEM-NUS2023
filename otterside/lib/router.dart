// loggedOut
// loggedIn

import 'package:flutter/material.dart';
import 'package:otterside/features/auth/screens/login_screen.dart';
import 'package:otterside/features/home/screens/home_screen.dart';
import 'package:routemaster/routemaster.dart';

final loggedOutRoute = RouteMap(routes: {
  '/': (_) => const MaterialPage(child: LoginScreen()), 
});

final loggedInRoute = RouteMap(routes: {
  '/': (_) => const MaterialPage(child: HomeScreen()), 
});