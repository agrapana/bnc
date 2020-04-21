import MainDashboard from './views/dashboard';
import EmailScreen from './views/email';

import PortfolioScreen from './templateviews/portfolio';
import PortfolioAddNewScreen from './templateviews/portfolio/addnew';
import PortfolioEditdataScreen from './templateviews/portfolio/edit';

import GalleryScreen from './templateviews/gallery';
import GalleryAddNewScreen from './templateviews/gallery/addnew';
import GalleryEditdataScreen from './templateviews/gallery/edit';

import SliderScreen from './templateviews/slider';
import SliderAddNewScreen from './templateviews/slider/addnew';
import SliderEditdataScreen from './templateviews/slider/edit';

import ProductScreen from './templateviews/product';
import ProductAddNewScreen from './templateviews/product/addnew';
import ProductEditdataScreen from './templateviews/product/edit';

import MasterUser from './masteradminviews/users';
import MasterAddUser from './masteradminviews/users/addnew';
import MasterEditUser from './masteradminviews/users/edit';

import MasterApplication from './masteradminviews/applications';
import MasterAddApplication from './masteradminviews/applications/addnew';
import MasterEditApplication from './masteradminviews/applications/edit';

import ServersScreen from './templateviews/server';
import ServerAddNewScreen from './templateviews/server/addnew';
import ServerEditdataScreen from './templateviews/server/edit';

import MasterLeague from './templateviews/league';
import MasterAddLeague from './templateviews/league/addnew';
import MasterEditLeague from './templateviews/league/edit';

import MasterLeagueTeams from './templateviews/teams';
import MasterLeagueTeamsEdit from './templateviews/teams/edit';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faPhotoVideo, faEdit, faBoxes, faBox, faGlassCheers } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { 
    faEnvelope, 
    // faListAlt, 
    faAddressCard 
} from '@fortawesome/free-regular-svg-icons';

library.add(faHome, faSignInAlt, faListUl, faCartArrowDown, faUser, faBell, faHeart, faSignOutAlt, faCogs, faUsers, faMoneyBillWave, faShippingFast, faEnvelopeOpenText, faTachometerAlt, faChessQueen, faShoppingCart, faExchangeAlt, faAddressCard, faMapPin, faClock, faMapMarkedAlt, faDollyFlatbed, faHandshake, faGlassCheers)

let version = "v4.3.2b"
let mainpath = [
    {
        name: 'Dashboard',
        link: '/admin/dashboard',
        component: MainDashboard,
        exact: true,
        public: true,
        show: true,
        faicons: faHome
    },
    {
        name: 'Email',
        link: '/admin/email',
        component: EmailScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faEnvelope
    }
]

let templatepath = [
    {
        name: 'Portfolio',
        link: '/admin/portfolio',
        component: PortfolioScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Gallery',
        link: '/admin/gallery',
        component: GalleryScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Slider',
        link: '/admin/slider',
        component: SliderScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Product',
        link: '/admin/product',
        component: ProductScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Servers',
        link: '/admin/servers',
        component: ServersScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faListUl
    }
]

let subtemplatepath = [
    {
        name: 'Add Portfolio',
        link: '/admin/portfolio/addnew',
        component: PortfolioAddNewScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Edit Portfolio',
        link: '/admin/portfolio/editdata',
        component: PortfolioEditdataScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Add Gallery',
        link: '/admin/gallery/addnew',
        component: GalleryAddNewScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Edit Gallery',
        link: '/admin/gallery/editdata',
        component: GalleryEditdataScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Add Slider',
        link: '/admin/slider/addnew',
        component: SliderAddNewScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Edit Slider',
        link: '/admin/slider/editdata',
        component: SliderEditdataScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Add Product',
        link: '/admin/product/addnew',
        component: ProductAddNewScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Edit Product',
        link: '/admin/product/editdata',
        component: ProductEditdataScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faPhotoVideo
    },
    {
        name: 'Add Servers',
        link: '/admin/servers/addnew',
        component: ServerAddNewScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faListUl
    },
    {
        name: 'Edit Servers',
        link: '/admin/servers/editdata',
        component: ServerEditdataScreen,
        exact: true,
        public: true,
        show: true,
        faicons: faListUl
    }
]

let adminpath = [
    {
        name: 'Admin',
        link: '/admin/master/user',
        component: MasterUser,
        exact: true,
        public: true,
        show: true,
        faicons: faUsers
    },
    {
        name: 'Application',
        link: '/admin/master/application',
        component: MasterApplication,
        exact: true,
        public: true,
        show: true,
        faicons: faBoxes
    },
    {
        name: 'League',
        link: '/admin/master/league',
        component: MasterLeague,
        exact: true,
        public: true,
        show: true,
        faicons: faGlassCheers
    },
    {
        name: 'Teams',
        link: '/admin/master/teams',
        component: MasterLeagueTeams,
        exact: true,
        public: true,
        show: true,
        faicons: faUsers
    }
]

let subadminpath = [
    {
        name: 'Edit Teams',
        link: '/admin/master/teams/editdata',
        component: MasterLeagueTeamsEdit,
        exact: true,
        public: true,
        show: true,
        faicons: faEdit
    },
    {
        name: 'Add User',
        link: '/admin/master/user/addnew',
        component: MasterAddUser,
        exact: true,
        public: true,
        show: true,
        faicons: faUsers
    },
    {
        name: 'Edit User',
        link: '/admin/master/user/editdata',
        component: MasterEditUser,
        exact: true,
        public: true,
        show: true,
        faicons: faEdit
    },
    {
        name: 'Add Application',
        link: '/admin/master/application/addnew',
        component: MasterAddApplication,
        exact: true,
        public: true,
        show: true,
        faicons: faBox
    },
    {
        name: 'Edit Application',
        link: '/admin/master/application/editdata',
        component: MasterEditApplication,
        exact: true,
        public: true,
        show: true,
        faicons: faEdit
    },
    {
        name: 'Add League',
        link: '/admin/master/league/addnew',
        component: MasterAddLeague,
        exact: true,
        public: true,
        show: true,
        faicons: faBox
    },
    {
        name: 'Edit League',
        link: '/admin/master/league/editdata',
        component: MasterEditLeague,
        exact: true,
        public: true,
        show: true,
        faicons: faEdit
    },
]


export default {
    version,
    mainpath,
    adminpath,
    subadminpath,
    templatepath,
    subtemplatepath
}