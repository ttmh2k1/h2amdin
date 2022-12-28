import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles(theme => ({
    container: {
        borderRadius: '0.4rem',
        backgroundColor: 'white',
        fontSize: '1.8rem',
        overflow: 'hidden'
    },
    titleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: '1.2rem 2.4rem',
        borderRadius: '0.4rem'
    },
    title: {
        fontSize: '2rem',
        color: '#955b36',
        fontWeight: 'bold'
    },
    titleRight: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    body: {
        display: 'flex',
        flexDirection: 'row',
    },
    footer: {
        display: 'flex',
        backgroundColor: '#f5f8f8',
        // padding: '1.2rem 2.4rem',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    // footer not background
    footer2: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'none',
        padding: '15px 0px 15px 22px',
        marginRight: '-1rem',
    },
    childrenBox: {
        padding: '0', // '13px',
        borderRadius: '7px',
        border: 'solid 1px #e9ebf1',
        backgroundColor: '#FFF'
    }
}));

export default useStyles;
