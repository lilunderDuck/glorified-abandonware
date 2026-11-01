# Brief
The goal of the final project is to create my own responsive website that not only adjusts to the screen size, but also to the user preferences. The site will support three distinct views - mobile, tablet, and large screens and react to the user settings of `prefers-reduced-motion` and color scheme. 

The starter code is provided here: [`WD4E-Advanced_Styling_with_Responsive_Design/RD-week4-final_project_starter`](https://github.com/academic-innovation-online-learning/WD4E-Advanced_Styling_with_Responsive_Design/tree/main/RD-week4-final_project_starter). Edit the `style.css` file to modify the mobile view and add four media queries. 

I'm free to make many personal choices in my submission, but it must fulfill the following requirements:
1. Replace all of the images from the starter code. Make sure to include alt text.
2. Replace all of the content in the `<p>` tag from the starter code. 
3. Check the code through the [w3validator](https://validator.w3.org/) and make necessary changes.
4. The mobile view must use a mobile-first approach (so no media queries for the mobile view) and
   1. Use a one column grid with a `10px` gap between rows and columns.
5. The tablet view must trigger at `772px`, not repeat unnecessary rules, and:
   1. Use a two column grid
   2. Set the `border-radius` on the figures to create a circular shape
   3. Set the last figure to take up both columns
6. The large screen view must trigger at `992px`, not repeat unnecessary rules, and:
   1. Set every third figure to take up both columns.
   2. Remove the `border-radius` from all of the figures. Make sure not to use `max-width`!!
7. The `prefers-reduced-motion` media query must remove the scroll behavior.
8. Assuming that your default color scheme is light, create a media query for dark colors that: 
   1. Change the `background-color` of the figures to a dark color.
   2. Change the font color of the figures to a lighter (possibly yellow-ish) color.
   3. Change the border color of the figures to black.
9. Run your code through the [wave validator](https://wave.webaim.org/), particularly to check for color contrast error. Fix any errors.