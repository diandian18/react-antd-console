function formatPermissions(permissions: string[]) {
  const set = new Set(permissions);
  return {
    home: set.has('home'),
    homeIndex: set.has('home:index'),
    homeGrid: set.has('home:grid'),
    profile: set.has('profile'),

    permission: set.has('permission'),
    routePermission: set.has('permission:route'),
    localPermission: set.has('permission:local'),
    permissionLocalBtn1: set.has('permission:local:btn1'),
    permissionLocalBtn2: set.has('permission:local:btn2'),

    router: set.has('router'),
    routerDynamic: set.has('router:dynamic'),
    routerMeta: set.has('router:meta'),

    nest: set.has('nest'),
    error: set.has('error'),

    external: set.has('external'),
    singleSlider: set.has('singleSlider'),
    separation: set.has('separation'),
  };
}

export default formatPermissions;

