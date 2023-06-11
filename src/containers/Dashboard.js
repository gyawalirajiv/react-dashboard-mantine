import {useEffect, useState} from 'react';
import {createStyles, Navbar, rem, Title, Tooltip, UnstyledButton} from '@mantine/core';
import {IconDeviceDesktopAnalytics, IconGauge, IconUser,} from '@tabler/icons-react';
import {MantineLogo} from '@mantine/ds';
import {NavbarLinksGroup} from "../components/dashboard-components/LinksGroup";

const useStyles = createStyles((theme) => ({
    wrapper: {
        display: 'flex',
    },

    aside: {
        flex: `0 0 ${rem(60)}`,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
    },

    main: {
        flex: 1,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    mainLink: {
        width: rem(44),
        height: rem(44),
        borderRadius: theme.radius.md,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        },
    },

    mainLinkActive: {
        '&, &:hover': {
            backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
        },
    },

    title: {
        boxSizing: 'border-box',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        marginBottom: theme.spacing.xl,
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.md,
        paddingTop: rem(18),
        height: rem(60),
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
    },

    logo: {
        boxSizing: 'border-box',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height: rem(60),
        paddingTop: theme.spacing.md,
        borderBottom: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
        }`,
        marginBottom: theme.spacing.xl,
    },

    link: {
        boxSizing: 'border-box',
        display: 'block',
        textDecoration: 'none',
        borderTopRightRadius: theme.radius.md,
        borderBottomRightRadius: theme.radius.md,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        padding: `0 ${theme.spacing.md}`,
        fontSize: theme.fontSizes.sm,
        marginRight: theme.spacing.md,
        fontWeight: 500,
        height: rem(44),
        lineHeight: rem(44),

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    linkActive: {
        '&, &:hover': {
            borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                .background,
            backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
                .background,
            color: theme.white,
        },
    },
}));

const teachersSubLists = [
    {
        id: 'teachers', icon: IconGauge, label: 'Teachers',
        links: [
            { id: 'add-teacher', label: 'Add Teacher', link: '/' },
            { id: 'list-teacher', label: 'List Teacher', link: '/' },
        ]
    },
    {
        id: 'students', icon: IconUser, label: 'Students',
        links: [
            { id: 'add-student', label: 'Add Student', link: '/' },
            { id: 'list-students', label: 'List Students', link: '/' },
        ]
    },
];
const schoolsSubLists = [
    {
        id: 'schools', icon: IconUser, label: 'Schools',
        links: [
            { id: 'add-school', label: 'Add school', link: '/' },
            { id: 'list-schools', label: 'List Schools', link: '/' },
        ]
    },
    {
        id: 'colleges', icon: IconGauge, label: 'Colleges',
        links: [
            { id: 'add-college', label: 'Add College', link: '/' },
            { id: 'list-colleges', label: 'List Colleges', link: '/' },
        ]
    }
];
const mainLinksMockdata = [
    // { id: 'home', icon: IconHome2, label: 'Home' },
    { id: 'teachers', icon: IconGauge, label: 'Teachers', subLists: teachersSubLists },
    { id: 'schools', icon: IconDeviceDesktopAnalytics, label: 'Schools', subLists: schoolsSubLists },
    // { id: 'releases', icon: IconCalendarStats, label: 'Releases' },
    // { id: 'account', icon: IconUser, label: 'Account' },
    // { id: 'security', icon: IconFingerprint, label: 'Security' },
    // { id: 'settings', icon: IconSettings, label: 'Settings' },
];

export function Dashboard() {
    const { classes, cx } = useStyles();
    const [active, setActive] = useState('teachers');
    const [subMenuOpenedLinks, setSubMenuOpenedLinks] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);

    useEffect(() => {
        console.log(subMenuOpenedLinks)
    }, [subMenuOpenedLinks]);

    let subLinks;
    const menuClicked = (link) => {
        setActive(link.id);

    };
    const mainLinks = mainLinksMockdata.map((link) => {
        if(link.id === active) subLinks = link.subLists;
        return (
            <Tooltip
                label={link.label}
                position="right"
                withArrow
                transitionProps={{ duration: 0 }}
                key={link.label}
            >
                <UnstyledButton
                    onClick={() => menuClicked(link)}
                    className={cx(classes.mainLink, { [classes.mainLinkActive]: link.id === active })}
                >
                    <link.icon size="1.4rem" stroke={1.5} />
                </UnstyledButton>
            </Tooltip>
        )});

    return (
        <Navbar height={750} width={{ sm: 300 }}>
            <Navbar.Section grow className={classes.wrapper}>
                <div className={classes.aside}>
                    <div className={classes.logo}>
                        <MantineLogo type="mark" size={30} />
                    </div>
                    {mainLinks}
                </div>
                <div className={classes.main}>
                    <Title order={4} className={classes.title}>
                        {active}
                    </Title>
                    {subLinks && subLinks.map(link => (
                        <NavbarLinksGroup
                            items={link}
                            openedLinks={subMenuOpenedLinks}
                            setOpenedLinks={setSubMenuOpenedLinks}
                            selectedMenu={selectedMenu}
                            setSelectedMenu={setSelectedMenu}
                        />
                    ))}
                </div>
            </Navbar.Section>
        </Navbar>
    );
}

export default Dashboard;