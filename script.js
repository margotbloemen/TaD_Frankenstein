// Declare variables for getting the xml file for the XSL transformation (folio_xml) and to load the image in IIIF on the page in question (number).
let tei = document.getElementById("folio");
let tei_xml = tei.innerHTML;
let extension = ".xml";
let folio_xml = tei_xml.concat(extension);
let page = document.getElementById("page");
let pageN = page.innerHTML;
let number = Number(pageN);

// Loading the IIIF manifest
var mirador = Mirador.viewer({
  id: "my-mirador",
  manifests: {
    "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json": {
      provider: "Bodleian Library, University of Oxford"
    }
  },
  window: {
    allowClose: false,
    allowWindowSideBar: true,
    allowTopMenuButton: false,
    allowMaximize: false,
    hideWindowTitle: true,
    panels: {
      info: false,
      attribution: false,
      canvas: true,
      annotations: false,
      search: false,
      layers: false,
    }
  },
  workspaceControlPanel: {
    enabled: false,
  },
  windows: [
    {
      loadedManifest: "https://iiif.bodleian.ox.ac.uk/iiif/manifest/53fd0f29-d482-46e1-aa9d-37829b49987d.json",
      canvasIndex: number,
      thumbnailNavigationPosition: "off",
      view: "single", // Ensures single canvas display
      canvasOptions: {
        zoomLevel: 1, // Adjust this to your desired initial zoom level
        rotation: 0,
      },
      defaultView: "single", // Use single-page view
      defaultZoomLevel: 1, // Ensure the image starts with a reasonable zoom
    }
  ]
});


// Function to transform the text encoded in TEI with the XSL stylesheet "Frankenstein_text.xsl"
function documentLoader() {
  Promise.all([
    fetch(folio_xml).then(response => response.text()),
    fetch("Frankenstein_text.xsl").then(response => response.text())
  ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("text");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
}

// Function to transform the metadata encoded in teiHeader with the XSL stylesheet "Frankenstein_meta.xsl"
function statsLoader() {
  Promise.all([
    fetch(folio_xml).then(response => response.text()),
    fetch("Frankenstein_meta.xsl").then(response => response.text())
  ])
    .then(function ([xmlString, xslString]) {
      var parser = new DOMParser();
      var xml_doc = parser.parseFromString(xmlString, "text/xml");
      var xsl_doc = parser.parseFromString(xslString, "text/xml");

      var xsltProcessor = new XSLTProcessor();
      xsltProcessor.importStylesheet(xsl_doc);
      var resultDocument = xsltProcessor.transformToFragment(xml_doc, document);

      var criticalElement = document.getElementById("stats");
      criticalElement.innerHTML = ''; // Clear existing content
      criticalElement.appendChild(resultDocument);
    })
    .catch(function (error) {
      console.error("Error loading documents:", error);
    });
}

// Event listener for hand selection dropdown
function selectHand(event) {
  // Get all elements associated with Mary and Percy
  const maryText = document.querySelectorAll(".MWS");
  const percyText = document.querySelectorAll(".PBS");

  // Function to reset visibility
  const resetVisibility = (elements) => {
    elements.forEach((el) => {
      el.style.display = "inline"; // Show element
    });
  };

  // Function to hide elements
  const hideElements = (elements) => {
    elements.forEach((el) => {
      el.style.display = "none"; // Hide element
    });
  };

  // Logic for dropdown selection
  if (event.target.value === "Mary") {
    resetVisibility(maryText); // Show Mary's text
    hideElements(percyText); // Hide Percy's text
  } else if (event.target.value === "Percy") {
    resetVisibility(percyText); // Show Percy's text
    hideElements(maryText); // Hide Mary's text
  } else {
    resetVisibility(maryText); // Show all text (Mary)
    resetVisibility(percyText); // Show all text (Percy)
  }
}

// Function to toggle the visibility of deletions
function toggleDeletions() {
  const deletions = document.querySelectorAll("del");
  deletions.forEach((del) => {
    del.style.display = del.style.display === "none" ? "inline" : "none";
  });
}

// Function to display text as a clean reading mode
function showReadingText() {
  const deletions = document.querySelectorAll("del");
  const additions = document.querySelectorAll(".add");

  deletions.forEach((del) => {
    del.style.display = "none";
  });

  additions.forEach((add) => {
    add.style.textDecoration = "none"; // Remove underline
    add.style.fontStyle = "normal"; // Remove italic
  });
}

// Hook up toggle functionality to buttons in HTML
document.addEventListener("DOMContentLoaded", () => {
  const dropdown = document.querySelector("#sel-hand");
  const toggleBtn = document.querySelector("#toggle-deletions-btn");
  const readingModeBtn = document.querySelector("#reading-mode-btn");

  if (dropdown) {
    dropdown.addEventListener("change", selectHand);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleDeletions);
  }

  if (readingModeBtn) {
    readingModeBtn.addEventListener("click", showReadingText);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Apply custom styles to all buttons
  const styleButtons = () => {
    const buttons = document.querySelectorAll("button, .btn");

    buttons.forEach((button) => {
      button.style.backgroundColor = "#6c757d"; // Default grey
      button.style.color = "#ffffff"; // White text
      button.style.border = "none";
      button.style.transition = "background-color 0.3s ease, color 0.3s ease";

      button.addEventListener("mouseover", () => {
        button.style.backgroundColor = "#c1492e"; // Hover red
        button.style.color = "#ffffff";
      });

      button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "#6c757d"; // Revert to grey
        button.style.color = "#ffffff";
      });

      button.addEventListener("mousedown", () => {
        button.style.backgroundColor = "#a13421"; // Click darker red
      });

      button.addEventListener("mouseup", () => {
        button.style.backgroundColor = "#c1492e"; // Revert to hover red
      });
    });
  };

  styleButtons();

  // Dropdown buttons fix for dynamically generated content
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.style.transition = "background-color 0.3s ease, color 0.3s ease";

    item.addEventListener("mouseover", () => {
      item.style.backgroundColor = "#c1492e"; // Hover red
      item.style.color = "#ffffff";
    });

    item.addEventListener("mouseout", () => {
      item.style.backgroundColor = "transparent"; // Default background
      item.style.color = "#333"; // Default text color
    });
  });
});

// Initial document load
documentLoader();
statsLoader();


function positionMarginNotes() {
  const marginNotes = document.querySelectorAll(".marginAdd.left");
  const transcriptionLines = document.querySelectorAll(".transcription p");

  marginNotes.forEach((note) => {
      const targetId = note.getAttribute("data-target-id");
      const targetLine = document.querySelector(`#${targetId}`);

      if (targetLine) {
          const targetPosition = targetLine.offsetTop;
          note.style.marginTop = `${targetPosition}px`;
      }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const marginNotes = document.querySelectorAll(".marginAdd.left");
  const lines = document.querySelectorAll(".transcription p");

  marginNotes.forEach((note, index) => {
    // Align the note with the corresponding line
    const correspondingLine = lines[index];
    if (correspondingLine) {
      const lineRect = correspondingLine.getBoundingClientRect();
      const noteRect = note.getBoundingClientRect();
      note.style.top = `${lineRect.top - noteRect.height / 2}px`;
    }
  });
});


function alignMarginNotes() {
  const marginNotes = document.querySelectorAll(".margin-notes");
  const transcriptionLines = document.querySelectorAll(".transcription p");

  marginNotes.forEach((note) => {
    const targetId = note.getAttribute("data-target-id");
    const targetLine = document.getElementById(targetId);

    if (targetLine) {
      const targetRect = targetLine.getBoundingClientRect();
      const layoutRect = document.querySelector(".transcription-layout").getBoundingClientRect();

      // Align margin note with the corresponding line
      note.style.top = `${targetRect.top - layoutRect.top}px`;
    }
  });
}

document.addEventListener("DOMContentLoaded", alignMarginNotes);
window.addEventListener("resize", alignMarginNotes);

document.addEventListener("DOMContentLoaded", () => {
  const pages = [
    "21r.html", "21v.html", "22r.html", "22v.html",
    "23r.html", "23v.html", "24r.html", "24v.html",
    "25r.html", "25v.html"
  ];

  const currentPage = document.getElementById("folio").innerText;
  const currentPageIndex = pages.findIndex((page) => page.startsWith(currentPage));

  const prevButton = document.getElementById("prev-btn");
  const nextButton = document.getElementById("next-btn");

  if (currentPageIndex > 0) {
    prevButton.addEventListener("click", () => {
      window.location.href = pages[currentPageIndex - 1];
    });
  } else {
    prevButton.setAttribute("disabled", "true");
  }

  if (currentPageIndex < pages.length - 1) {
    nextButton.addEventListener("click", () => {
      window.location.href = pages[currentPageIndex + 1];
    });
  } else {
    nextButton.setAttribute("disabled", "true");
  }
});

function addPageNumber() {
  const pageNumber = document.querySelector(".circled-page-number");
  const transcription = document.getElementById("text");

  if (pageNumber && transcription) {
      transcription.insertAdjacentElement("afterbegin", pageNumber);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  documentLoader();
  addPageNumber(); // Re-add page number after the loader
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleNotesBtn = document.getElementById("toggle-notes-btn");

  if (toggleNotesBtn) {
    toggleNotesBtn.addEventListener("click", () => {
      const notes = document.querySelectorAll(".editor-note");
      notes.forEach((note) => {
        note.style.display = note.style.display === "none" ? "inline" : "none";
      });
    });
  }
});


