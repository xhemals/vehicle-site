# UK Vehicle Site

A web application to check and display various details about vehicles in the UK, including tax status, MOT status, vehicle specifications, mileage history, and more.

## Table of Contents

- [UK Vehicle Site](#uk-vehicle-site)
    - [Table of Contents](#table-of-contents)
    - [Technologies](#technologies)
    - [APIs Used](#apis-used)
    - [Features](#features)
        - [Number Plate Search](#number-plate-search)
        - [Vehicle Information](#vehicle-information)
        - [Tax and MOT Status](#tax-and-mot-status)
        - [Mileage History](#mileage-history)
        - [MOT History](#mot-history)
        - [Dark Mode](#dark-mode)
    - [Pages](#pages)
        - [Home Page](#home-page)
            - [Vehicle Check Page](#vehicle-check-page)
        - [MOT History Search Page](#mot-history-search-page)
            - [MOT History Page](#mot-history-page)
                - [Passed MOT](#passed-mot)
                - [Passed W/ Advisory MOT](#passed-w-advisory-mot)
                - [Failed MOT](#failed-mot)
        - [Mileage History Search Page](#mileage-history-search-page)
            - [Mileage History Page](#mileage-history-page)
    - [Error Handling](#error-handling)
        - [Invalid Number Plate](#invalid-number-plate)
        - [Vehicle Not Found](#vehicle-not-found)
        - [No Recorded MOT Data](#no-recorded-mot-data)
        - [No eBay Listings for Vehicle](#no-ebay-listings-for-vehicle)

## Technologies

- [**React**](https://react.dev/): JavaScript library for building user interfaces.
- [**Next.js**](https://nextjs.org/): React framework for server-side rendering and static site generation.
- [**TypeScript**](https://www.typescriptlang.org/): Superset of JavaScript which adds static typing.
- [**Tailwind CSS**](https://tailwindcss.com/): Utility-first CSS framework for styling.

## APIs Used

- [**DVLA VES**](https://developer-portal.driver-vehicle-licensing.api.gov.uk/apis/vehicle-enquiry-service/vehicle-enquiry-service-description.html): Vehicle registration and tax information.
- [**DVSA MOT Hisotry**](https://findtransportdata.dft.gov.uk/dataset/mot-history-api): MOT test results.
- [**eBay**](https://developer.ebay.com/develop/apis): Vehicle listings.

## Features

- **Number Plate Search**: Search vehicle details using vehicle registration numbers.
- **Vehicle Information**: Display details like make, model, year, color, etc.
- **Tax and MOT Status**: Retrieve and display tax and MOT status.
- **Mileage History**: Display mileage history and generate mileage charts.
- **MOT History**: Display detailed MOT history including passed/failed MOTs.
- **Dark Mode**: Support for dark mode.

### Number Plate Search

This feature allows users to search for vehicle details using vehicle registration numbers. When searching using a number plate, the application will validate the number plate and display the results. If the number plate is invalid, the user will be displayed an error message telling them the plate is invalid.

### Vehicle Information

This feature displays information about the vehicle, including make, model, year, colour, and more. The information is retrieved from the DVLA VES API and the DVSA MOT API; it is then displayed in a user-friendly format. All of the important information is displayed on the vehicle information page.

### Tax and MOT Status

This feature displays tax and MOT status for the vehicle. The tax status is retrieved from the DVLA VES API, and the MOT status is retrieved from the DVSA MOT API. The information is then displayed to the user giving them color-coded status indicators for tax and MOT status. Making it the first thing the user sees when looking up a vehicle as this is the most important information to know.

### Mileage History

This feature displays mileage history for the vehicle. The mileage history is retrieved from the DVSA MOT API and displayed in a user-friendly format. The mileage history includes information such as the last known mileage, the mileage last year, and the average yearly mileage. It also includes a chart showing the mileage changes over time.

The mileage information is taken from the MOT test results section of the DVSA MOT API. The application only mileage data from PASSED MOTs, this way it can easily be sorted through years and reduced unnecessary data.

### MOT History

This feature displays detailed MOT history for the vehicle. The MOT history is retrieved from the DVSA MOT API and displayed in a user-friendly format. The MOT history includes information such as the last known MOT test date, the total number of MOTs, the number of PASSED MOTs, and the number of failed MOTs. It also goes into detail on specific MOTs, including the MOT test number, the completed date, the mileage, and the defects. These results are colour-coded to make it easier to understand the status of each MOT.

### Dark Mode

This feature adds support for dark mode to the application. The application uses the [shadcn dark mode](https://ui.shadcn.com/docs/dark-mode/next) feature. Which allows the user to switch between light and dark modes.

## Pages

- [**Home Page**](src/pages/index.tsx): The home page of the application. As well as the vehicle check search page.
  - [**Vehicle Check Page**](src/pages/vehicle-check/[reg].tsx): The vehicle check page. This page displays the vehicle information, tax and MOT status, mileage history, and MOT history.
- [**MOT History Search Page**](src/pages/mot-history/index.tsx): The MOT history search page.
  - [**MOT History Page**](src/pages/mot-history/[reg].tsx): The MOT history page. This page displays the detailed MOT history for the vehicle.
- [**Mileage History Search Page**](src/pages/mileage-history/index.tsx): The mileage history search page.
  - [**Mileage History Page**](src/pages/mileage-history/[reg].tsx): The mileage history page. This page displays the mileage history for the vehicle.

### Home Page

<img src="https://github.com/user-attachments/assets/5dccf073-d57a-4f44-bead-1df3bb50d5d9" alt="Home Page Screenshot" width="750"/>

This page is the first thing the user sees when they visit the website. It allows them to search for vehicle details using a number plate. This then takes them to the vehicle check page where they can view the vehicle information, tax and MOT status, mileage history, and MOT history. It also tells them what information is available when searching for a vehicle.

#### <h3>Vehicle Check Page</h3>

<img src="https://github.com/user-attachments/assets/1ec4a724-944b-44af-977b-9331f1a8459f" alt="Vehicle Check Page Screenshot" width="750"/>

This page displays the vehicle information, tax and MOT status, mileage history, MOT history and allows the user to view the similar vehicles for sale on eBay. The information displayed on this page is the most important information for the user. For more detailed information of specific sections, there is a button to take them to the relevant page.

### MOT History Search Page

<img src="https://github.com/user-attachments/assets/b84d506f-78b7-4e11-8a6c-d62485744924" alt="Mileage History Search Page Screenshot" width="750"/>

This page is the search page for the MOT history. It is almost identical to the home page, but the search redirects the user to the MOT history page and tells them what information is available when searching for a vehicles MOT history.

#### <h3>MOT History Page</h3>

<img src="https://github.com/user-attachments/assets/59129645-bf1b-475e-843c-233d734aa772" alt="MOT History Page Screenshot" width="750"/>

This page displays the detailed MOT history for the vehicle. Instead of just showing a basic overview of all MOTs, this page goes into detail on each MOT, including the MOT test number, the completed date, the mileage, and the defects. These results are colour-coded to make it easier to understand the status of each MOT.

##### <h4>Passed MOT</h4>

<img src="https://github.com/user-attachments/assets/dcb2f691-bce6-42ca-b99c-89f83f1df12e" alt="Passed MOT Screenshot" width="750"/>

##### <h4>Passed W/ Advisory MOT</h4>

<img src="https://github.com/user-attachments/assets/d65f628b-e217-4241-ad03-5341311fc25c" alt="Passed W/ Advisory MOT Screenshot" width="750"/>

##### <h4>Failed MOT</h4>

<img src="https://github.com/user-attachments/assets/bac782e3-0157-452e-a1cd-401b20dfa661" alt="Failed MOT Screenshot" width="750"/>

### Mileage History Search Page

<img src="https://github.com/user-attachments/assets/0a4d1e11-8182-4a58-b76e-e2b910d27496" alt="Mileage History Search Page Screenshot" width="750"/>

This page is the search page for the mileage history. It is almost identical to the home page, but the search redirects the user to the mileage history page and tells them what information is available when searching for a vehicles mileage history.

#### <h3>Mileage History Page</h3>

<img src="https://github.com/user-attachments/assets/b009f518-f985-4348-a5f0-2b1846bf7f1a" alt="Mileage History Page Screenshot" width="750"/>

This page displays the mileage history for the vehicle. It goes into a bit more details about the milage history of the vehicle. Showing the user a chart of the mileage over time and gives the user a breakdown of the mileage by year.

## Error Handling

I have tried to make the application as error-free as possible. This is to make sure the user doesn't have their experiences disrupted by errors. If an error occurs, the application is made to let the user know what went wrong, i.e. the vehicle is not found, the number plate is invalid, etc.

### Invalid Number Plate

- **Home Page**
- **MOT History Search Page**
- **Mileage History Search Page**

<img src="https://github.com/user-attachments/assets/3cd7b068-8293-4e71-b112-11860c524bdb" alt="Invalid Number Plate Page Screenshot" width="750"/>

If a number plate is using an invalid format, the application will display an error message telling the user that the number plate is invalid. This check is done using the [uk-numberplates](https://www.npmjs.com/package/uk-numberplates) package. This package determines correct or incorrect UK number plate formats.

The above error message will show if this check returns `false` when pressing search

The same check is also used if a user types the number plate into the url. If this happens, the application will redirect the user to the home page.

**TODO**:

- [ ] Take the user back to the search page but put the invalid number plate in the input field. And display the error message.

### Vehicle Not Found

- **Vehicle Check Page**
- **MOT History Page**
- **Mileage History Page**

<img src="https://github.com/user-attachments/assets/644abeba-8d56-4e63-8c5e-51bc8967c77f" alt="Vehicle Not Found Page Screenshot" width="750"/>

If a vehicle is not found, the application will display an error message telling the user that the vehicle cannot be found. This is to make sure the user knows that the vehicle they are looking for cannot be found. This error message will also let the user know possible reasons why the vehicle cannot be found. There is also a link to the page they searched from, so they can try again.

### No Recorded MOT Data

- **Vehicle Check Page**
- **MOT History Page**
- **Mileage History Page**

**Vehicle Check Page:**

<img src="https://github.com/user-attachments/assets/97fbaf16-9abb-476f-ab84-44fbdb363716" alt="No Recorded MOT Data Page Screenshot" width="750"/>

**MOT History Page:**

<img src="https://github.com/user-attachments/assets/e3a256fd-c3aa-4970-9add-698e09943fd4" alt="No Recorded MOT Data Page Screenshot" width="750"/>

**Mileage History Page:**

<img src="https://github.com/user-attachments/assets/7a354ad8-979c-4678-8199-82f083e8e579" alt="No Recorded MOT Data Page Screenshot" width="750"/>

If there is no recorded MOT data for the vehicle, the application will display an error message telling the user that there is no recorded MOT data. This will also create an error with the mileage, as it requires MOT data to calculate the mileage of the vehicle. The error message will let the user know some possible reasons why there is no recorded MOT data.

### No eBay Listings for Vehicle

If there are no eBay listings for the vehicle, the application will hide that section from the vehicle check page
