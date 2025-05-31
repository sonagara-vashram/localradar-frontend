import { BiSolidCameraMovie } from "react-icons/bi";

export const ContentItem = ({ icon, label, value, styles }) => (
  <div className="flex items-center py-1.5">
    {icon}
    <div className="ml-3">
      <span className={`font-medium ${styles.infoLabel}`}>{label}: </span>
      <span className={styles.infoValue}>{value || "Not available"}</span>
    </div>
  </div>
);

export function renderCategoryIcon(categoryId) {
  switch (categoryId) {
    case "restaurant":
      return (
        <path
          d="M7 22H3C2.44772 22 2 21.5523 2 21V14C2 13.4477 2.44772 13 3 13H7C7.55228 13 8 13.4477 8 14V21C8 21.5523 7.55228 22 7 22ZM15 22H11C10.4477 22 10 21.5523 10 21V9C10 8.44772 10.4477 8 11 8H15C15.5523 8 16 8.44772 16 9V21C16 21.5523 15.5523 22 15 22ZM23 22H19C18.4477 22 18 21.5523 18 21V3C18 2.44772 18.4477 2 19 2H23C23.5523 2 24 2.44772 24 3V21C24 21.5523 23.5523 22 23 22Z"
          fill="currentColor"
        />
      );
    case "hotels":
      return (
        <path
          d="M19 24H5C3.34315 24 2 22.6569 2 21V8H22V21C22 22.6569 20.6569 24 19 24ZM12 5C12 4.44772 12.4477 4 13 4H18C18.5523 4 19 4.44772 19 5V8H12V5ZM5 8V5C5 4.44772 5.44772 4 6 4H11C11.5523 4 12 4.44772 12 5V8H5Z"
          fill="currentColor"
        />
      );
    case "schools":
      return (
        <path
          d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 15.99L12 18.72L7 15.99V12.27L12 15L17 12.27V15.99Z"
          fill="currentColor"
        />
      );
    case "hospitals":
      return (
        <path
          d="M18 14H14V18H10V14H6V10H10V6H14V10H18V14ZM19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3Z"
          fill="currentColor"
        />
      );
    case "gyms":
      return (
        <path
          d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z"
          fill="currentColor"
        />
      );
    case "dentists":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "parks":
      return (
        <path
          d="M20 3H4V10C4 12.21 5.79 14 8 14H14C16.21 14 18 12.21 18 10V5H20V10C20 13.31 17.31 16 14 16H8C4.69 16 2 13.31 2 10V3H20ZM4 19H20V21H4V19Z"
          fill="currentColor"
        />
      );
    case "libraries":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "colleges":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "firestations":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "nightclubs":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "policestations":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "supermarkets":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );
    case "publictransport":
      return (
        <path
          d="M12 2C13.11 2 14 2.9 14 4C14 5.1 13.11 6 12 6C10.89 6 10 5.11 10 4C10 2.89 10.89 2 12 2ZM12.02 8C14.4 8 19 9.09 19 11.5V15H5V11.5C5 9.09 9.6 8 11.98 8H12.02ZM19 15.5V16C19 17.11 18.11 18 17 18H7C5.89 18 5 17.11 5 16V15.5H19ZM16.5 20H15.56C15.89 20.71 16.5 21.23 16.5 22H7.5C7.5 21.23 8.11 20.71 8.44 20H7.5C5 20 2.5 19.2 2.5 17.5V17H21.5V17.5C21.5 19.2 19 20 16.5 20Z"
          fill="currentColor"
        />
      );  
    case "cinemas":
      return <BiSolidCameraMovie />;

    default:
      return (
        <path
          d="M4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22ZM14 16.5V13.5H18V16.5H14ZM6 16.5V13.5H10V16.5H6ZM6 10.5V7.5H10V10.5H6ZM14 10.5V7.5H18V10.5H14Z"
          fill="currentColor"
        />
      );
  }
}

export function getCategoryLabel(categoryId) {
  switch (categoryId) {
    case "restaurant":
      return "Restaurant";
    case "hotels":
      return "Hotel";
    case "schools":
      return "School";
    case "hospitals":
      return "Hospital";
    case "gyms":
      return "Gym";
    case "dentists":
      return "Dentist";
    case "libraries":
      return "Library";
    case "firestations":
      return "Fire Station";
    case "nightclubs":
      return "Night Club";
    case "policestations":
      return "Police Station";
    case "supermarkets":
      return "Supermarket";
    case "cinemas":
      return "Cinema";
    case "publictransport":
      return "Public Transport";
    case "parks":
      return "Parks";
    case "salons":
      return "Salon";
    case "shoppingmalls":
      return "Shopping Mall";
    case "amusementparks":
      return "Amusement Park";

    default:
      return categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  }
}

// Format review count text
export function formatReviewCount(count) {
  if (!count) return "No reviews yet";
  if (count > 999) return `${(count / 1000).toFixed(1)}k reviews`;
  return `${count} ${count === 1 ? "review" : "reviews"}`;
}

// Render category-specific tags
export function renderCategoryTags(item, categoryId, styles) {
  const tags = [];

  switch (categoryId) {
    case "restaurant":
      if (item.restaurantType) {
        tags.push({
          content: item.restaurantType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.price) {
        tags.push({
          content: item.price,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;
    // case "hotels":
    //   if (item.hotelType) {
    //     tags.push({
    //       content: item.hotelType,
    //       bgClass: styles.tagBg,
    //       textClass: styles.tagText,
    //     });
    //   }
    // break;

    case "colleges":
      if (item.collegeType) {
        tags.push({
          content: item.collegeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;

    case "schools":
      if (item.schoolType) {
        tags.push({
          content: item.schoolType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "dentists":
      if (item.dentistType) {
        tags.push({
          content: item.dentistType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;

    case "parks":
      if (item.parkType) {
        tags.push({
          content: item.parkType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;

    case "publictransport":
      if (item.transportType) {
        tags.push({
          content: item.transportType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;

    case "cinemas":
      if (item.cinemaType) {
        tags.push({
          content: item.cinemaType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "coachingcenters":
      if (item.centerType) {
        tags.push({
          content: item.centerType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "coffeeshops":
      if (item.coffeshopType) {
        tags.push({
          content: item.coffeshopType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.price) {
        tags.push({
          content: item.price,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;

    case "hospitals":
      if (item.hospitalType) {
        tags.push({
          content: item.hospitalType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "gyms":
      if (item.gymType) {
        tags.push({
          content: item.gymType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.gymAge) {
        tags.push({
          content: item.gymAge,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;
    case "policestations":
      if (item.deptType) {
        tags.push({
          content: item.deptType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "hostels":
      if (item.hostelType) {
        tags.push({
          content: item.hostelType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "jewelryshops":
      if (item.shopType) {
        tags.push({
          content: item.shopType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "musicdanceacademies":
      if (item.academiesType) {
        tags.push({
          content: item.academiesType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "sportsclubs":
      if (item.clubType) {
        tags.push({
          content: item.clubType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "supermarkets":
      if (item.marketType) {
        tags.push({
          content: item.marketType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "temples":
      if (item.templeType) {
        tags.push({
          content: item.templeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "yogacenters":
      if (item.centerType) {
        tags.push({
          content: item.centerType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;

    case "libraries":
      if (item.status) {
        tags.push({
          content: item.status,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "police_stations":
      if (item.deptType) {
        tags.push({
          content: item.deptType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "bookstores":
      if (item.storeType) {
        tags.push({
          content: item.storeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "carrepairservices":
      if (item.serviceType) {
        tags.push({
          content: item.serviceType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "clinics":
      if (item.clinicsType) {
        tags.push({
          content: item.clinicsType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "clothingstores":
      if (item.storeType) {
        tags.push({
          content: item.storeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "electronicstores":
      if (item.storeType) {
        tags.push({
          content: item.storeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "eyecarecenters":
      if (item.centerType) {
        tags.push({
          content: item.centerType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "firestation":
      if (item.stationType) {
        tags.push({
          content: item.stationType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "furniturestores":
      if (item.storeType) {
        tags.push({
          content: item.storeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "grocerystore":
      if (item.storeType) {
        tags.push({
          content: item.storeType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "museums":
      if (item.museumType) {
        tags.push({
          content: item.museumType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "nightclubs":
      if (item.clubType) {
        tags.push({
          content: item.clubType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.price) {
        tags.push({
          content: item.price,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;
    case "fastfood":
      if (item.fastfoodType) {
        tags.push({
          content: item.fastfoodType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.price) {
        tags.push({
          content: item.price,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;
    case "beaches":
      if (item.beachType) {
        tags.push({
          content: item.beachType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "salons":
      if (item.salonsType) {
        tags.push({
          content: item.salonsType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "shoppingmalls":
      if (item.shoppingmallType) {
        tags.push({
          content: item.shoppingmallType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "amusementparks":
      if (item.parkType) {
        tags.push({
          content: item.parkType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      break;
    case "bakeries":
      if (item.bakeriesType) {
        tags.push({
          content: item.bakeriesType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.price) {
        tags.push({
          content: item.price,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;
    case "bars":
      if (item.pubType) {
        tags.push({
          content: item.pubType,
          bgClass: styles.tagBg,
          textClass: styles.tagText,
        });
      }
      if (item.price) {
        tags.push({
          content: item.price,
          bgClass: styles.priceBg,
          textClass: styles.priceText,
        });
      }
      break;

    default:
      break;
  }

  return tags.map((tag, idx) => (
    <span
      key={idx}
      className={`px-2.5 py-1 rounded-full text-sm font-medium ${tag.bgClass} ${tag.textClass}`}
    >
      {tag.content}
    </span>
  ));
}

export const getLocationIcon = (styles) => (
  <svg
    className={`w-5 h-5 ${styles.infoIcon}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

export const getContactIcon = (styles) => (
  <svg
    className={`w-5 h-5 ${styles.infoIcon}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

const renderCommonInfo = (item, styles) => {
  const locationIcon = getLocationIcon(styles);
  const contactIcon = getContactIcon(styles);

  return (
    <div className="space-y-2">
      {item.contact && (
        <ContentItem
          icon={contactIcon}
          label="Contact"
          value={item.contact}
          styles={styles}
        />
      )}
      {item.location && (
        <ContentItem
          icon={locationIcon}
          label="Location"
          value={item.location}
          styles={styles}
        />
      )}
    </div>
  );
};

// Render content specific to each category
export function renderCategoryContent(item, categoryId, styles) {
  // For cinemas, we only show location
  // if (categoryId === "cinemas") {
  //   return (
  //     <div className="space-y-2">
  //       {item.location && (
  //         <ContentItem
  //           icon={getLocationIcon(styles)}
  //           label="Location"
  //           value={item.location}
  //           styles={styles}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  const commonCategories = [
    "restaurant",
    "dentists",
    "hotels",
    "schools",
    "colleges",
    "hospitals",
    "gyms",
    "parks",
    "libraries",
    "publictransport",
    "policestations",
    "salons",
    "shoppingmalls",
    "amusementparks",
    "bakeries",
    "bars",
    "beaches",
    "weather",
    "bookstores",
    "carrepairservices",
    "cinemas",
    "clinics",
    "clothingstores",
    "coachingcenters",
    "coffeeshops",
    "electronicstores",
    "eyecarecenters",
    "fastfood",
    "firestation",
    "furniturestores",
    "grocerystore",
    "hostels",
    "jewelryshops",
    "jobs",
    "museums",
    "musicdanceacademies",
    "news",
    "nightclubs",
    "sportsclubs",
    "supermarkets",
    "temples",
    "yogacenters",
  ];


  if (commonCategories.includes(categoryId)) {
    return renderCommonInfo(item, styles);
  }

  return (
    <div className="text-gray-600 italic">No additional details available.</div>
  );
}
