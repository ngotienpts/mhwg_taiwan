document.addEventListener("DOMContentLoaded", function () {
    // Tập hợp tất cả các phần tử cần sử dụng
    const backTop = document.querySelector("#back-top");
    const stickyHeaderPC = document.querySelector(".js__stickyHeader");
    const video169s = document.querySelectorAll(".js__video169");
    // search
    const searchContainer = document.querySelector(".js__searchContainer")
    // show sub menu
    const dropdownSubMenu = document.querySelectorAll(".js__dropDown");
    const subMenu = document.querySelector(".js__clickShowMenuMb");

    const tableOfContents = document.querySelectorAll(".js__tableOfContentItem");

    const formInputs = document.querySelectorAll(".comment-form-input");




    // Xử lý sự kiện khi nhấn nút "back to top"
    function handleBackTop() {
        if(!backTop) return;
        
        backTop.onclick = function () {
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        };
        
    }

    // Xử lý sự kiện focus vào thẻ input textarea
    function handleFocuswithin() {
        if(!formInputs) return
        formInputs.forEach((formInput)=>{
            let inputElement = formInput.querySelector('input, textarea');
            if (inputElement) {
                inputElement.addEventListener('input', () => {
                    if (inputElement.value.trim() !== '') {
                        formInput.classList.add('not-empty');
                    } else {
                        formInput.classList.remove('not-empty');
                    }
                });
            }
        })
    }

    // Xử lý sự kiện show menu ở handbook
    function handleTableOfContent () {
        if(! tableOfContents) return

        tableOfContents.forEach((tableOfContent)=>{
            var children = tableOfContent.querySelector('.js__tableOfContentHeading')
            children.onclick = function() {
                tableOfContent.classList.toggle('active')
            }
        })
    }

    // Xử lý sự kiện khi nhấn nút search trên thanh navbar
    function handleSearchNavbar() {
        if(!searchContainer) return

        var searchIcon = searchContainer.querySelector('.js__searchIcon')
        var closeSearch = searchContainer.querySelector('.js__closeSearch')
        var searchInput = searchContainer.querySelector('.js__searchInput')

        searchIcon.onclick = function() {
            searchContainer.classList.add('active')
            searchInput.focus()
        }
        closeSearch.onclick = function() {
            if(searchContainer.closest('.active')){
                searchContainer.classList.remove('active')
                searchInput.value = ''
            }
        }
    }
    // xử lý sự kiện để show sub menu
    function handleShowSubMenu() {
        if (!subMenu) return;
        var closeSubMenu = document.querySelector(".js__closeSubMenu");
        var overlay = document.querySelector(".js__overlay");
        var parentBox = subMenu.parentElement;

        subMenu.onclick = function () {
            this.parentElement.classList.add("active");
            document.querySelector("body").style.overflow = "hidden";
        };
        closeSubMenu.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
        overlay.onclick = function () {
            parentBox.classList.remove("active");
            document.querySelector("body").style.overflow = "auto";
        };
    }


    // Xử lý sự kiện để show dropdown submenu
    function handleShowDropdownSubMenu() {
        dropdownSubMenu &&
            dropdownSubMenu.forEach((item) => {
                var parent = item.parentElement;
                var nextEle = parent.querySelector(".js__listSubMenu");
                item.onclick = function () {
                    parent.classList.toggle("active");
                    if (nextEle.style.maxHeight) {
                        nextEle.style.maxHeight = null;
                    } else {
                        nextEle.style.maxHeight = nextEle.scrollHeight + "px";
                    }
                };
            });
    }

    // Xử lý video tỉ lệ 16:9
    function handleVideo169() {
        if (video169s) {
            video169s.forEach((video169) => {
                var videos = video169.querySelectorAll("iframe");
                if (videos) {
                    videos.forEach((video) => {
                        var w = video.offsetWidth;
                        video.style.height = (w * 9) / 16 + "px";
                    });
                }
            });
        }
    }

    // Xử lý thanh header dính
    function handleStickyHeader() {
        if (stickyHeaderPC) {
            const isSticky = scrollY > 100;
            stickyHeaderPC.classList.toggle("sticky", isSticky);
        }
    }
    // Hàm hiển thị nút backTop dựa trên vị trí cuộn trang
    function handleBackTopVisibility() {
        if (backTop) {
            if (
                document.body.scrollTop > 300 ||
                document.documentElement.scrollTop > 300
            ) {
                backTop.style.opacity = 1;
                backTop.style.visibility = "visible";
            } else {
                backTop.style.opacity = 0;
                backTop.style.visibility = "hidden";
            }
        }
    }
    // Xử lý sự kiện khi cuộn trang
    function handleWindowScroll() {
        window.onscroll = function () {
            handleStickyHeader();
            handleBackTopVisibility()
        };
    }

    // Khởi tạo tất cả các chức năng
    function initApp() {
        handleBackTop();
        handleShowSubMenu();
        handleShowDropdownSubMenu();
        handleVideo169();
        handleTableOfContent();
        handleFocuswithin();
        // scroll
        handleWindowScroll();
        handleSearchNavbar();
    }

    // Bắt đầu khởi tạo ứng dụng
    initApp();
});
