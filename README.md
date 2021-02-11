# BPA-NLC Hub

NLC Hub is a web-application developed using React, MaterialUI, Styled Components, Redux, Firebase (DB, Hosting, and Functions), and Google Maps React.

## Routing

You'll see routing handled in an unconventional way throughout the app. Since the app was created without React Router initially, we added routing through custom state management and URL manipulation.


## Development
On the [main application](https://bpa-nlc.com/app), everything was developed from scratch using Create-React-App. No code from previous projects was used, and there was no template at all.

If you are familiar with Redux, you'll see that we used 1 store to manage all our data. This is also how routing was achieved. [See here for Redux](https://github.com/CharanSriram/BPA-NLC-Planner/blob/main/BPA%20Web%20Design/bpa-nlc-webdesign/src/redux_guts/redux.js).

The [landing page](https://bpa-nlc.com) was statically developed using Webflow. This was done for webcrawlers to comb our site easier as most the main application's eventual HTML is rendered with React.

## Contact
Please contact charanyan@gmail.com for any questions about development. In the subject-line, refer to the project in question :)