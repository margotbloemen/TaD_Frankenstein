# Mini-Frankenstein: A Scholarly Digital Edition

This project is a scholarly digital edition of Mary Shelley's *Frankenstein*, created as part of the "Text as Data" course at the University of Antwerp. It provides annotated manuscript pages, highlights the editorial changes by Mary and Percy Shelley, and integrates a modern interface for exploring this literary classic.

---

## **Project Overview**
The Mini-Frankenstein project brings together the original manuscript pages of *Frankenstein* and a digitally encoded edition. The project focuses on presenting the textual history of the novel through:
- Annotations detailing Mary and Percy Shelley's edits.
- A responsive and user-friendly web interface.
- Integration of the Mirador viewer to display high-quality manuscript images.

### **Features**
- **Annotations**: Highlights and tags for edits (`<add>` and `<del>`) by Mary and Percy Shelley, styled dynamically.
- **Navigation Tools**: Includes "Previous" and "Next" buttons, a dropdown menu for selecting pages, and toggle buttons for showing/hiding edits.
- **Mirador Viewer**: Embeds manuscript pages with zoom and pan functionality.
- **Mobile Responsiveness**: Optimized for both desktop and mobile viewing.
- **Styling**: Customized CSS for a gloomy red-and-grey aesthetic, reflecting the themes of the novel.

---

## **File Overview**
Here’s a breakdown of the files in this repository:

### **Main Files**
- `index.html`: The landing page of the project with links to manuscript pages and additional information.
- `style.css`: Contains global styles for layout, colors, and typography.
- `script.js`: JavaScript file for dynamic functionalities (e.g., toggle buttons, navigation).

### **Manuscript Pages**
- HTML Pages:
  - `21r.html`, `21v.html`, `22r.html`, `22v.html`, `23r.html`, `23v.html`, `24r.html`, `24v.html`, `25r.html`, `25v.html`: Represent the different manuscript pages with encoded annotations and links to their XML counterparts.
- XML Files:
  - `21r.xml`, `21v.xml`, `22r.xml`, `22v.xml`, `23r.xml`, `23v.xml`, `24r.xml`, `24v.xml`, `25r.xml`, `25v.xml`: Encoded textual data for the corresponding manuscript pages, using TEI-like conventions.

### **XSL Files**
- `Frankenstein_meta.xsl`: Handles metadata transformation and integration.
- `Frankenstein_text.xsl`: Styles and processes textual annotations for display in the HTML.

### **Assets**
- `img/`: Contains the images and video used for styling or manuscript display.

---

## **How to View the Project**
Open `index.html` in your browser to navigate the site.  
For a live version, visit:  
[https://margotbloemen.github.io/TaD_Frankenstein/](https://margotbloemen.github.io/TaD_Frankenstein/)

---

## **Challenges and Solutions**
- **Broken Paths**: Initially, reorganizing directories caused issues with paths, so the original structure was preserved.
- **Dynamic Margin Notes**: Unable to align notes dynamically with the text lines; a fixed-top solution was implemented instead.
- **Mirador Viewer**: Limited customization due to external script constraints, leaving the manuscript zoom default unresolved.

---

## **Credits**
- **Author**: Margot Bloemen  
- **Supervisors**: Dr. Lamyk Bekius and Dr. Nooshin Shahidzadeh Asadi  

This project was inspired by the Bodleian Library’s digital edition of *Frankenstein* and aims to contribute to the field of digital humanities by blending creativity with scholarly precision.

---

## **License**
This project is for educational purposes and follows the license agreement outlined by the course. For more details, please contact the author.
