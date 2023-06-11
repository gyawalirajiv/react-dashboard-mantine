import {Box, Collapse, createStyles, Group, rem, Text, ThemeIcon, UnstyledButton,} from '@mantine/core';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons-react';

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs} ${theme.spacing.md}`,
        paddingLeft: rem(31),
        marginLeft: rem(30),
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `${rem(1)} solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[1],
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

    chevron: {
        transition: 'transform 200ms ease',
    },
}));

export function LinksGroup({ id, icon: Icon, label, initiallyOpened, links, openedLinks, setOpenedLinks, selectedMenu, setSelectedMenu }) {
    const { classes, theme, cx } = useStyles();
    const hasLinks = Array.isArray(links);
    const opened = openedLinks?.filter(link => link === id).length > 0;
    const setOpened = () => {
        if(opened) {
            const temp = [...openedLinks];
            temp.splice(temp.indexOf(id), 1);
            setOpenedLinks([...temp]);
        } else {
            setOpenedLinks([...openedLinks, id]);
        }
    }

    const menuSelected = (event, linkId) => {
        event.preventDefault();
        setSelectedMenu(linkId)
    }

    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? links : []).map((link) => (
        <>
            <Text
                component="a"
                className={cx(classes.link, {[classes.linkActive]: link.id === selectedMenu}) }
                href={link.link}
                key={link.label}
                onClick={(event) => menuSelected(event, link.id)}
            >
                {link.label}
            </Text>
        </>
    ));

    return (
        <>
            <UnstyledButton onClick={() => setOpened()} className={classes.control}>
                <Group position="apart" spacing={0}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon size="1.1rem" />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <ChevronIcon
                            className={classes.chevron}
                            size="1rem"
                            stroke={1.5}
                            style={{
                                transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
}

export function NavbarLinksGroup({items, openedLinks, setOpenedLinks, selectedMenu, setSelectedMenu}) {
    return (
        <>
            <LinksGroup
                {...items}
                openedLinks={openedLinks}
                setOpenedLinks={(links) => setOpenedLinks(links)}
                selectedMenu={selectedMenu}
                setSelectedMenu={setSelectedMenu}
            />
        </>
    );
}
export default NavbarLinksGroup;