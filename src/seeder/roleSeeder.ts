import { AppDataSource } from "../dataSource";
import { Permission } from "../entity/permissionEntity";
import { Role } from "../entity/roleEntity";


AppDataSource.initialize()
  .then(async () => {
    const permissionRepository = AppDataSource.getRepository(Permission);
    const perms = ['view_users', 'edit_users', 'view_roles', 'edit_roles', 'view_products', 'edit_products', 'view_orders', 'edit_orders']

    let permissions = [];

    for (let i = 0; i < perms.length; i++) {
      permissions.push(await permissionRepository.save({
        name: perms[i]
      }));
    }

    const roleRepository = AppDataSource.getRepository(Role);

    await roleRepository.save({
      name: 'Admin',
      permissions
    });

    // edit_rolesの削除
    delete permissions[3];

    await roleRepository.save({
      name: 'Editor',
      permissions
    });

    delete permissions[1];
    delete permissions[5];
    delete permissions[7];

    await roleRepository.save({
      name: 'Viewer',
      permissions
    });

    process.exit(0);
  });