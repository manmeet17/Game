(function (window) {

    /**
     * Toast - Toast Controller Class
     * @param {Node} containerEle - DOM Container element
     */
    function ToastContainer() {
        // TODO : Gravity (add to comments the options and impliment)
        // TODO : Remove styles from css if possible
        // Append Toast container to page
        var containerTopEle = document.createElement("div");
        containerTopEle.id = "toast-container-top";
        document.body.appendChild(containerTopEle);

        var containerBottomEle = document.createElement("div");
        containerBottomEle.id = "toast-container-bottom";
        document.body.appendChild(containerBottomEle);

        // Set defaults
        this.topToastContainerEle = containerTopEle;
        this.bottomToastContainerEle = containerBottomEle;
        this.message = "Something went wrong, Try Again";
        this.timeout = 5000; // 5 seconds
        this.logging = false;
        this.gravity = 'top';
        this.dismiss = true;
    }
    /**
     * Show Toast
     * @param {String} msg Toast Message
     * @param {Object} [options] Individual Toast options to override the defaults
     * @param {String} [options.message] - Toast default message
     * @param {Number} [options.timeout] - Toast default timeout
     * @param {Boolean} [options.logging] - Toast default logging option
     * @param {String} [options.gravity] - Toast default gravity
     * @param {Function} [callback]
     */
    ToastContainer.prototype.toast = function (msg, options, callback) {

        // Options
        var opt = options || {}
        var m = msg || this.message;
        var t = opt.timeout || this.timeout;
        var g = opt.gravity || this.gravity;
        var d = opt.dismiss || this.dismiss;
        var log = opt.logging || this.logging;

        // Create HTML
        var containerEle = (g === "top") ? this.topToastContainerEle : this.bottomToastContainerEle;
        var toastEle = document.createElement("div");
        toastEle.classList.add("simple-toast");
        toastEle.innerHTML = m;
        toastEle.classList.add(g);
        containerEle.appendChild(toastEle);

        // Slide in toast
        setTimeout(function () {
            toastEle.classList.add("show");
        }, 500);

        // Slide out toast
        setTimeout(function () {
            toastEle.classList.remove("show");
        }, t + 500);

        // Remove from DOM
        setTimeout(function () {
            containerEle.removeChild(toastEle);
        }, t + 700);

        // Log Error
        if (log) {
            console.log(m);
        }

        // Dismiss toast
        if (d) {
            toastEle.addEventListener("click", function () {
                toastEle.classList.remove("show")
                setTimeout(function () {
                    containerEle.removeChild(toastEle);
                }, 200);
            })
        }

        if (callback) {
            return callback(null, m);
        }
    }

    /**
     * Initialize the Library
     * define globally if it doesn't already exist
     */
    if (typeof (toast) === 'undefined') {
        document.addEventListener("DOMContentLoaded", function () {
            var toastCtlr = new ToastContainer();
            window.toast = toastCtlr.toast.bind(toastCtlr);
        });
    }
    else {
        console.log("Toast Library already defined.");
    }
})(window)  