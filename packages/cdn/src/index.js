// All PWA Fire Bundle Features as ES6 Module
const copyStyles = `
    display: inline-block;
    padding: 2px 6px;
    font-size: 12px;
    color: #165c26;
    background-color: #dcffe4;
    border-radius: 3px;`;
// Declare the PWA Features class...
class PWA {
  // Copy text...
  copyText(element) {
    element.addEventListener("click", async (event) => {
      let html = element.innerHTML;
      let text = element.innerText;
      try {
        await navigator.clipboard.writeText(text);
        // Show success message...
        element.innerHTML = `<span style="${copyStyles}">
                Copied to clipboard!</span>`;
        // Show previous text...
        setTimeout(() => {
          element.innerHTML = html;
        }, 3000);
      } catch (err) {
        console.error("Failed to copy to clipboard", err);
      }
    });
  }
  // Copy image
  copyImage(imgURL) {
    Copy(imgURL);
    async function Copy(imgURL) {
      // Copy: Writing image to the clipboard
      try {
        const data = await fetch(imgURL);
        const blob = await data.blob();
        await navigator.clipboard.write([
          new ClipboardItem(
            Object.defineProperty({}, blob.type, {
              value: blob,
              enumerable: true,
            })
          ),
        ]);
        console.log("Image copied.");
        return `Image copied.`;
      } catch (e) {
        console.error(e, e.message);
      }
    }
  }
  // Web Share...
  Share(element, data) {
    element.addEventListener(`click`, () => {
      // Check if web share is supported
      if (navigator.share) {
        navigator
          .share(data)
          .then(() => console.log(`Successful share`))
          .catch((error) => console.log(`Error sharing`, error));
      } else {
        console.log(`Web share not supported on desktop...`);
      }
    });
  }
  // Contacts Picker...
  Contacts(element, props, options) {
    element.addEventListener("click", async () => {
      try {
        const contacts = await navigator.contacts.select(props, options);
        // Return contacts...
        return contacts;
      } catch (error) {
        // Handle any errors here...
        alert(error);
      }
    });
  }
  // Connectivity...
  Connectivity(online, offline) {
    // Once the DOM is loaded, check for connectivity...
    document.addEventListener("DOMContentLoaded", () => {
      // Offline Event...
      if (!navigator.onLine) {
        offline();
      }
      // Online Event...
      window.addEventListener("online", () => {
        online();
      });
    });
  }
  // Badge...
  Badge(unreadCount) {
    return {
      get Set() {
        navigator.setAppBadge(unreadCount).catch((error) => {
          // Do something with the error.
          console.log(error);
        });
        return `Set bage`;
      },
      get Clear() {
        // Clear the badge
        navigator.clearAppBadge().catch((error) => {
          // Do something with the error.
          console.log(error);
        });
        return `Clear badge`;
      },
    };
  }
  // Payment...
  Payment(element, paydata, validatePayment) {
    // Initiate Payment UI on click...
    element.addEventListener("click", (event) => {
      event.preventDefault();
      const paymentRequest = new PaymentRequest(
        paydata.paymentMethods,
        paydata.paymentDetails,
        paydata.options
      );
      // Initiate user interface...
      paymentRequest
        .show()
        .then((paymentResponse) => {
          // Validate with backend...
          validatePayment(paymentResponse);
        })
        .catch((err) => {
          // API error or user cancelled the payment
          console.log("Error:", err);
        });
    });
  }
  // Fullscreen...
  Fullscreen(element) {
    element.addEventListener("click", (event) => {
      event.preventDefault();

      if (document.fullscreenEnabled) {
        document.documentElement.requestFullscreen();
      }
        
      if(document.fullscreenElement) {
          element.style.display = `none`
      }
    });
  }
  // Notification...
  Notification(element) {
    element.addEventListener("click", (event) => {
      event.preventDefault();
      console.log(`click`);
      if ("Notification" in window) {
        Notification.requestPermission()
          .then((permission) => {
            console.log(permission);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        return `Notifications not supported.`;
      }
    });
  }
}

// Create an instance of PWA
const pwa = new PWA();
// Export the instance
// export default pwa;
