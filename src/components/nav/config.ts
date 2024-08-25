interface ListItem {
  title: string;
  href: string;
  description?: string;
}

interface ListItemCard extends ListItem {
  logo?: React.ReactNode;
}

interface MenuConfig {
  type: "normal" | "hover";
  data: ListItem[];
  trigger?: string;
  card?: ListItemCard;
}

export const navigationMenuConfig: MenuConfig[] = [
  {
    type: "normal",
    data: [{ title: "About MoGO", href: "/", description: "" }],
  },
  {
    type: "normal",
    data: [{ title: "Donate", href: "/", description: "" }],
  },
  // TODO: Create pages when museum details become available
  // {
  //   type: 'normal',
  //   data: [{ title: 'Camps', href: '/classes/camp', description: '' }]
  // },
  // {
  //   type: 'hover',
  //   trigger: 'Classes',
  //   card: {
  //     title: 'Classes',
  //     href: '/classes',
  //     description: 'All ages welcome!'
  //   },
  //   data: [
  //     {
  //       title: 'Group',
  //       href: '/classes/group',
  //       description: 'From beginner to master through a structured weekly learning plan.'
  //     },
  //     {
  //       title: 'Private',
  //       href: '/classes/private',
  //       description: 'Professional 1-on-1 coaching to power up your skills.'
  //     },
  //   ]
  // },
];
