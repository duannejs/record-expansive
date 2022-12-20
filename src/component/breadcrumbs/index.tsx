import Link, { LinkProps } from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Link as RouterLink, } from 'react-router-dom'
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface LinkRouterProps extends LinkProps {
    to: string;
    replace?: boolean;
}

const LinkRouter = (props: LinkRouterProps) => (
    <Link {...props} component={RouterLink as any} />
);


const BreadcrumbsComp = () => {

    const { t } = useTranslation();

    const breadcrumbNameMap: { [key: string]: string } = {
        '/vm-pay/private/home': t('menu.dashboard.label'),
        '/vm-pay/private/report': t('menu.report.label'),
       // '/vm-pay/private/payments/transaction': t('menu.transaction.list'),
       // '/vm-pay/private/settings/wallet': t('menu.configuration.wallet'),
       // '/vm-pay/private/settings/configuration': t('menu.configuration.settings'),
    };

    const pathnames = location.pathname.split('/').filter((x) => {
        if (x && !(x.includes('private') || x.includes('vm-pay')))
            return true;
    });
    return (
        <Breadcrumbs aria-label="breadcrumb" sx={{mb:2}}>
            {pathnames.map((value, index) => {
                const last = index === pathnames.length - 1;
                const to = `/vm-pay/private/${pathnames.slice(0, index + 1).join('/')}`;
                return last ? (
                    <Typography color="text.primary" key={to}>
                        {breadcrumbNameMap[to]}
                    </Typography>
                ) : (
                    <LinkRouter underline="hover" color="inherit" to={to} key={to}>
                        {breadcrumbNameMap[to]}
                    </LinkRouter>
                );
            })}
        </Breadcrumbs>
    )
}

export default BreadcrumbsComp