function formatPermissions(permissions: string[]) {
  const set = new Set(permissions);
  return {
    home: set.has('home'),
    homeIndex: set.has('home:index'),
    homeGrid: set.has('home:grid'),
    profile: set.has('profile'),
    nest: set.has('nest'),
    error: set.has('error'),
  };
}

export default formatPermissions;

