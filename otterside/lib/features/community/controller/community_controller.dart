import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:otterside/core/constants/constants.dart';
import 'package:otterside/core/providers/storage_repository_provider.dart';
import 'package:otterside/features/auth/controller/auth_controller.dart';
import 'package:otterside/features/community/repository/community_repository.dart';
import 'package:otterside/models/community_model.dart';
import 'package:routemaster/routemaster.dart';
import 'package:otterside/core/utils.dart';

final userCommunitiesProvider = StreamProvider((ref) {
  final communityController = ref.watch(communityControllerProvider.notifier);
  return communityController.getUserCommunities();
});

final communityControllerProvider = StateNotifierProvider<CommunityController, bool>((ref) {
  final communityRepository = ref.watch(communityRepositoryProvider);
  final storageRepository = ref.watch(storageRepositoryProvider);
  return CommunityController(
    communityRepository: communityRepository, 
    storageRepository: storageRepository,
    ref: ref);
});

final getCommunityByNameProvider = StreamProvider.family((ref, String name) {
  return ref.watch(communityControllerProvider.notifier).getCommunityByName(name);
});


class CommunityController extends StateNotifier<bool> {
  final CommunityRepository _communityRepository;
  final Ref _ref;
  final StorageRepository _storageRepository;
  CommunityController({
    required CommunityRepository communityRepository, 
    required Ref ref,
    required StorageRepository storageRepository, 
  }) : _communityRepository = communityRepository,
        _ref = ref,
        _storageRepository = storageRepository, 
        super(false);

  void createCommunity(String name, BuildContext context) async {
    state = true;
    final uid = _ref.read(userProvider)?.uid ?? '';
    Community community = Community(
      id: name, 
      name: name, 
      banner: Constants.bannerDefault, 
      avatar: Constants.avatarDefault,
      members: [uid], 
      mods: [uid],
    );

     final res = await _communityRepository.createCommunity(community);
    state = false;
    res.fold((l) => showSnackBar(context, l.message), (r) {
      showSnackBar(context, 'Community created successfully!');
      Routemaster.of(context).pop();
    });
  }

  Stream<List<Community>> getUserCommunities() {
    final uid = _ref.read(userProvider)!.uid;
    return _communityRepository.getUserCommunities(uid);
  }

  Stream<Community> getCommunityByName(String name) {
    return _communityRepository.getCommunityByName(name);
  }

  void editCommunity({
    required File? profileFile, 
    required File? bannerFile, 
    required BuildContext context, 
    required Community community
  }) async {
    state = true;
    if(profileFile!=null) {
      // communities/profile/memes
      final res = await _storageRepository.storeFile(
        path: 'communities/profile', 
        id: community.name, 
        file: profileFile,
      );
      res.fold(
        (l) => showSnackBar(context, l.message), 
        (r) => community = community.copyWith(avatar: r),
      );
    }

    if(bannerFile!=null) {
      // communities/banner/memes
      final res = await _storageRepository.storeFile(
        path: 'communities/banner', 
        id: community.name, 
        file: bannerFile,
      );
      res.fold(
        (l) => showSnackBar(context, l.message), 
        (r) => community = community.copyWith(banner: r),
      );
    }

    final res = await _communityRepository.editCommunity(community);
    state = false;
    res.fold(
      (l) => showSnackBar(context, l.message), 
      (r) => Routemaster.of(context).pop()
    );
  }
}