/**
 * Font Awesome Configuration
 * 
 * Initialize Font Awesome library with icons used throughout the application.
 * Import this file once in main.tsx to register all icons.
 */
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  // Project category icons
  faChartLine,
  faShieldHalved,
  faUsers,
  faBug,
  faMobile,
  faGraduationCap,
  faCode,
  faRobot,
  faGavel,
  faDatabase,
  faCog,
  
  // Contact icons
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faPhone,
  
  // Skills icons
  faLock,
  faBrain,
  faLandmark,
  faScrewdriverWrench,
  faChartPie,
  
  // Experience icons
  faBriefcase,
  faPersonWalkingLuggage,
  faBuilding,
  faCalendarDays,
  
  // About icons
  faLaptopCode,
  faLightbulb,
  faHandshake,
  faHeart,
  
  // Navigation / general
  faArrowDown,
  faCheck,
  faCircle
} from '@fortawesome/free-solid-svg-icons';

import {
  faEnvelope as faEnvelopeRegular,
  faCircle as faCircleRegular
} from '@fortawesome/free-regular-svg-icons';

import {
  faLinkedin,
  faGithub,
  faReact,
  faPython,
  faJs,
  faNode
} from '@fortawesome/free-brands-svg-icons';

// Register icons in the library for global use
library.add(
  // Solid icons
  faChartLine,
  faShieldHalved,
  faUsers,
  faBug,
  faMobile,
  faGraduationCap,
  faCode,
  faRobot,
  faGavel,
  faDatabase,
  faCog,
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faPhone,
  faLock,
  faBrain,
  faLandmark,
  faScrewdriverWrench,
  faChartPie,
  faBriefcase,
  faPersonWalkingLuggage,
  faBuilding,
  faCalendarDays,
  faLaptopCode,
  faLightbulb,
  faHandshake,
  faHeart,
  faArrowDown,
  faCheck,
  faCircle,
  
  // Regular icons
  faEnvelopeRegular,
  faCircleRegular,
  
  // Brand icons
  faLinkedin,
  faGithub,
  faReact,
  faPython,
  faJs,
  faNode
);

export default library;
