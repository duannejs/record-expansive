export interface IMenu{
    id: number;
    label: string;
    description: string;
    open: boolean;
    items: IMenuItems[];
}

export interface IMenuItems{
    id: number;
    icon: any;
    label: string;
    link: string;
    isActive: boolean;
    permission: number;
}
