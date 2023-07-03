document.addEventListener("DOMContentLoaded", function (event) {
  if (document.querySelector(".gallery__slider") !== null) {
    new Swiper(".gallery__slider", {
      speed: 600,
      spaceBetween: 0,
      slidesPerView: 1,
      effect: "fade",
      thumbs: {
        swiper: {
          el: ".gallery__navslider",
          slidesPerView: 4,
          spaceBetween: 8,
        },
      },
    });
  }
  if (document.querySelector(".mycards__swiper") !== null) {
    new Swiper(".mycards__swiper", {
      speed: 600,
      spaceBetween: 20,
      slidesPerView: 1.1,
    });
  }
  if (document.querySelector(".passport__slider") !== null) {
    new Swiper(".passport__slider", {
      speed: 600,
      spaceBetween: 0,
      slidesPerView: 1,
      effect: "fade",
      thumbs: {
        swiper: {
          el: ".passport__navslider",
          slidesPerView: 4,
          spaceBetween: 8,
        },
      },
    });
  }

  const bElements = document.querySelectorAll(".descr__text b");
  bElements.forEach(function (bElement) {
    bElement.addEventListener("click", function (event) {
      const prevElement = bElement.previousElementSibling;
      prevElement.classList.toggle("active");
      if (prevElement.classList.contains("active")) {
        bElement.textContent = bElement.getAttribute('data-hide');
      } else {
        bElement.textContent = bElement.getAttribute('data-show');
      }
    });
  });
  document.querySelectorAll(".size__card label").forEach(function (label) {
    const labelWidth = label.offsetWidth;
    label.style.minHeight = labelWidth + "px";
  });

  if (document.querySelector("#slider") !== null) {
    const slider = document.getElementById("slider");
    noUiSlider.create(slider, {
      start: [0],
      connect: [true, false],
      step: 0.1,
      range: {
        min: [0],
        max: [5],
      },
    });
    slider.noUiSlider.on("update", function (values, handle) {
      document
        .querySelector("#slider .noUi-handle")
        .setAttribute("aria-valuetext", parseFloat(values[handle]));
    });
  }
  if (document.querySelector("#slider-installment") !== null) {
    const sliderinstallment = document.getElementById("slider-installment");
    noUiSlider.create(sliderinstallment, {
      start: [1],
      connect: [true, false],
      step: 1,
      range: {
        min: [1],
        max: [36],
      },
    });
    sliderinstallment.noUiSlider.on("update", function (values, handle) {
      document
        .querySelector("#slider-installment .noUi-handle")
        .setAttribute("aria-valuetext", parseFloat(values[handle]));
    });
  }
  const decrement = document.querySelectorAll(".cart__count svg:first-child");
  decrement.forEach(function (decr) {
    decr.addEventListener("click", function (event) {
      const input = this.parentNode.querySelector("input");
      var count = parseInt(input.value) - 1;
      count = count < 1 ? 1 : count;
      input.value = count;
    });
  });
  const increment = document.querySelectorAll(".cart__count svg:last-child");
  increment.forEach(function (incr) {
    incr.addEventListener("click", function (event) {
      const input = this.parentNode.querySelector("input");
      input.value = parseInt(input.value) + 1;
    });
  });
  function maskCC(event) {
    var vcc = this.value.replace(/\D/g, "");
    this.value = "";
    for (var i = 0; i < vcc.length; i++) {
      this.value += (i % 4 == 0 && i != 0 ? " " : "") + vcc[i];
    }
  }

  function modifyInput() {
    if (this.value.length == 2) this.value = this.value + "/";
    else if (this.value.length == 3 && this.value.charAt(2) == "/")
      this.value = this.value.replace("/", "");
  }
  if (document.querySelector("#cardnumber") !== null) {
    document
      .getElementById("cardnumber")
      .addEventListener("input", maskCC, false);
    document
      .getElementById("expirydate")
      .addEventListener("input", modifyInput);
  }
  const toBack = document.querySelectorAll(".header__arr");
  toBack.forEach(function (back) {
    back.addEventListener("click", function (event) {
      history.back();
      return false;
    });
  });
  const toBack1 = document.querySelectorAll(".header__arrow");
  toBack1.forEach(function (back1) {
    back1.addEventListener("click", function (event) {
      history.back();
      return false;
    });
  });
  var reviewFormcalc = document.querySelector(".review-form__calc a");
  if (reviewFormcalc) {
    reviewFormcalc.addEventListener("click", function (e) {
      e.preventDefault();
      var installmentamount = document.querySelector(
        '[name="Installment-amount"]'
      );
      var priceafterdiscount = document.querySelector(
        '[name="price-after-discount"]'
      );
      var Overpaymentpercent = document.querySelector(
        '[name="Overpayment-percent"]'
      );
      var Overpayment = document.querySelector('[name="Overpayment"]');
      var old_price = document.querySelector('[name="old_price"]');
      var Monthlypayment = document.querySelector('[name="Monthly-payment"]');
      var Endofpayments = document.querySelector('[name="End-of-payments"]');
      var sliderinstallment = Math.round(
        document
          .querySelector("#slider-installment .noUi-handle")
          .getAttribute("aria-valuenow")
      );

      if (
        priceafterdiscount.parentNode.parentNode.querySelector(
          'input[type="checkbox"]'
        ).checked
      ) {
        installmentamount.value = Math.round(
          priceafterdiscount.value * (Overpaymentpercent.value / 100 + 1)
        );
        Overpayment.value = Math.round(
          installmentamount.value - priceafterdiscount.value
        );
      } else {
        installmentamount.value = old_price.value;
        Overpayment.value = old_price.value;
      }
      Monthlypayment.value = Math.round(
        installmentamount.value / sliderinstallment
      );
      var today = new Date();
      var monthsToAdd = sliderinstallment;
      var futureDate = new Date(today);
      futureDate.setMonth(futureDate.getMonth() + monthsToAdd);
      var formattedDate =
        ("0" + futureDate.getDate()).slice(-2) +
        "." +
        ("0" + (futureDate.getMonth() + 1)).slice(-2) +
        "." +
        futureDate.getFullYear();
      Endofpayments.value = formattedDate;
    });
  }

  function disableRequiredInputs() {
    var elements = document.querySelectorAll(
      "[data-content]:not(.target) [required]"
    );
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = true;
    }
    var elements1 = document.querySelectorAll(
      ".target[data-content] [required]"
    );
    for (var i = 0; i < elements1.length; i++) {
      elements1[i].disabled = false;
    }
  }
  disableRequiredInputs();
  const sellersel = document.querySelectorAll(".seller__sel:not(.disabled)");
  sellersel.forEach(function (sellersel) {
    sellersel.addEventListener("click", function (event) {
      const dataSel = this.parentNode.querySelectorAll("[data-tab].active");
      for (let j = 0; j < dataSel.length; j++) {
        dataSel[j].classList.remove("active");
      }
      this.classList.add("active");
      const target = Array.from(this.parentNode.parentNode.children).filter(element => element.matches("[data-content].target"));
      for (let j = 0; j < target.length; j++) {
        target[j].classList.remove("target");
      }
      const dataTab = this.getAttribute("data-tab");
      const dataId = document.querySelector(`[data-content="${dataTab}"]`);
      if (dataId !== null) {
        dataId.classList.add("target");
      }
      disableRequiredInputs();
    });
  });

  function preventScreenshot() {
    document.addEventListener("keyup", function (e) {
      if (e.keyCode === 44) {
        e.stopPropagation();
        alert("Скриншоты не разрешены на этой странице. ");
      }
    });
  }
  preventScreenshot();

  const inputField = document.querySelectorAll(
    "textarea[disabled], input[disabled]"
  );
  inputField.forEach(function (inputf) {
    inputf.addEventListener("copy", function (event) {
      event.preventDefault();
      return false;
    });
  });
  var addButton = document.querySelector(".addproduct-whosale__btn");
  if (addButton) {
    addButton.addEventListener("click", function (e) {
      e.preventDefault();
      var blockToCopy = document.querySelector(
        ".addproduct-whosale:first-child"
      );
      var copiedBlock = blockToCopy.cloneNode(true);
      addButton.parentNode.insertBefore(copiedBlock, addButton);
    });
  }

  var toggleinputs = document.querySelectorAll(
    '.review-form__checked input[type="checkbox"]'
  );

  if (toggleinputs.length > 0) {
    toggleinputs.forEach(function (toggleinput) {
      toggleinput.addEventListener("click", function (event) {
        var parentElement = this.parentNode;
        var requiredInput = parentElement.querySelector("[required]");

        if (requiredInput) {
          requiredInput.disabled = !this.checked;
        }
      });
      toggleinput.dispatchEvent(new Event("click"));
    });
  }

  var toggleButton = document.querySelector(".filters__content-filter");
  var contentList = document.querySelector(".filters__content-filter ul");
  function toggleClass(element, className) {
    if (element.classList.contains(className)) {
      element.classList.remove(className);
    } else {
      element.classList.add(className);
    }
  }
  function hideContentList(event) {
    var targetElement = event.target;
    if (
      targetElement !== toggleButton &&
      !toggleButton.contains(targetElement)
    ) {
      contentList.classList.remove("show");
    }
  }
  if (toggleButton) {
    toggleButton.addEventListener("click", function () {
      toggleClass(contentList, "show");
    });
    document.addEventListener("click", hideContentList);
  }

  const filterscontentbtn = document.querySelectorAll(
    ".filters__content-filter ul li"
  );
  filterscontentbtn.forEach(function (filterscontentbtn) {
    filterscontentbtn.addEventListener("click", function (event) {
      this.parentNode.previousElementSibling.querySelector("span").innerHTML = this.querySelector("a").innerHTML;     
      const sortel = this.parentNode.querySelectorAll("li.active");
      for (let j = 0; j < sortel.length; j++) {
        sortel[j].classList.remove("active");
      }
      this.classList.add('active');
    });
  });

  var fileInputs = document.getElementsByClassName("verificationfile");
  var fileLabels = document.getElementsByClassName("verificationlabel");

  for (var i = 0; i < fileInputs.length; i++) {
    fileInputs[i].addEventListener("change", function (event) {
      var index = Array.prototype.indexOf.call(fileInputs, event.target);
      fileLabels[index].querySelector("span").textContent =
        event.target.files[0].name;
    });
  }
  // const verificationpopup = document.querySelectorAll("[data-topopup]");
  // verificationpopup.forEach(function (verificationpopup) {
  //   verificationpopup.addEventListener("click", function (event) {
  //     event.preventDefault();
  //     var form = this.parentNode;

  //     var fileInputs = form.querySelectorAll(
  //       'input[type="file"]:not([disabled])'
  //     );
  //     var allFilesSelected = true;
  //     for (var i = 0; i < fileInputs.length; i++) {
  //       var fileInput = fileInputs[i];
  //       if (fileInput.files.length === 0) {
  //         allFilesSelected = false;
  //         break;
  //       }
  //     }
  //     if (checkValidity(form) && allFilesSelected) {
  //       const datapopupclass = this.getAttribute("data-topopup");
  //       document.querySelector(`.${datapopupclass}`).classList.add("open");
  //     }
  //   });
  // });


// Получаем форму по её ID
  var form = document.querySelector('form[data-topopup]');
  if (form) {
    // Добавляем обработчик события отправки формы
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Предотвращаем обновление страницы по умолчанию
      var xhr = new XMLHttpRequest();
      var url = form.getAttribute('action');
      var formData = new FormData(form);
      xhr.open('POST', url, true); // Замените '/submit' на URL вашего серверного обработчика формы
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.send(formData);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // Ответ получен успешно
          const datapopupclass = form.getAttribute("data-topopup");
          document.querySelector(`.${datapopupclass}`).classList.add("open");
        } else {
          console.log('Произошла ошибка при отправке формы.');
        }
      };
    });
  }


  const popupclosebtn = document.querySelectorAll(".verification-confirmed .confirmed__btn");
  popupclosebtn.forEach(function (popupclosebtn) {
    popupclosebtn.addEventListener("click", function (event) {
      document.querySelector(".verification-confirmed").classList.remove("open");
    });
  });
  // function checkValidity(form) {
  //   var isValid = true;
  //   var elements = form.elements;
  //   var invalidElements = []; // Массив для хранения невалидных элементов
  //   form.querySelectorAll(".novalid").forEach(function (element) {
  //     element.classList.remove("novalid");
  //   });
  //   for (var i = 0; i < elements.length; i++) {
  //     var element = elements[i];
  //     if (element.offsetParent !== null && !element.disabled) {
  //       if (element.checkValidity && !element.checkValidity()) {
  //         isValid = false;
  //         invalidElements.push(element); // Добавляем невалидный элемент в массив
  //       }
  //       var input = document.getElementById("nameInput");
  //       if (input) {
  //         if (input.value.indexOf(" ") === -1) {
  //           isValid = false;
  //           invalidElements.push(input); // Добавляем невалидный элемент в массив
  //         }
  //       }
  //     }
  //   }
  //   if (!isValid) {
  //     // Добавляем класс 'novalid' ко всем невалидным элементам
  //     invalidElements.forEach(function (element) {
  //       element.previousElementSibling.classList.add("novalid");
  //     });
  //     if (invalidElements.length > 0) {
  //       invalidElements[0].previousElementSibling.scrollIntoView({
  //         behavior: "smooth",
  //       });
  //     }
  //   }
  //   return isValid;
  // }


  if (document.querySelector(".review-form__radios") !== null) {
    descrSwiper =  new Swiper(".review-form__radios .swiper", {
      speed: 600,
      spaceBetween: 20,
      slidesPerView: 1,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
    descrSwiper.on('slideChangeTransitionEnd ', function () {
        document.querySelector('.swiper-slide-active>input').checked = true;
    });
  }
  var adDescr = document.querySelector('.review-form__addbutton');
  if (adDescr) {
    adDescr.addEventListener('click', function(event) {
      event.preventDefault();
      adDescr.previousElementSibling.classList.toggle('show');
      this.parentNode.previousElementSibling.previousElementSibling.classList.toggle('hide');
      var descrsEl = this.parentNode.previousElementSibling.querySelectorAll("[required]");
      var descrMain = this.parentNode.querySelector("textarea");
      if(this.parentNode.previousElementSibling.previousElementSibling.matches('.hide')){
        for (var i = 0; i < descrsEl.length; i++) {
          descrsEl[i].disabled = true;
        }        
        descrMain.disabled = false;
      }else{
        for (var i = 0; i < descrsEl.length; i++) {
          descrsEl[i].disabled = false;
        }  
        descrMain.disabled = true;      
      }
    });
  }

  var addMorephoto = document.getElementById('addmore');
  var fileList = [];
  if (addMorephoto) {
    addMorephoto.addEventListener('change', function(event) {
      var files = event.target.files;
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        fileList.push(file);
        var container = document.createElement('div');
        container.className = 'edit-photos__photo';
        var image = document.createElement('img');
        image.src = URL.createObjectURL(file);
        image.alt = '';
        var button = document.createElement('b');
        container.appendChild(image);
        container.appendChild(button);
        this.closest('.edit').querySelector('.edit-photos').appendChild(container);
      }
    });
    document.addEventListener("click", function (event) {
      if (event.target.matches(".edit-photos__photo b")) {
        event.target.parentNode.remove();
      }
    });
    // var form = addMorephoto.closest('form');
    // form.addEventListener('submit', function(event) {
    //   sendFileList(fileList);
    // });


  }

  // function sendFileList(fileList) {
  //   var formData = new FormData();
  //   for (var i = 0; i < fileList.length; i++) {
  //     var file = fileList[i];
  //     formData.append('files', file, file.name);
  //   }
  //   var xhr = new XMLHttpRequest();
  //   xhr.open('POST', '/upload', true);
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //       console.log('Файлы успешно загружены на сервер');
  //     } else {
  //       console.log('Ошибка при загрузке файлов на сервер');
  //     }
  //   };
  //   xhr.send(formData);
  // }


});
