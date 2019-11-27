/**
 * Developed by Jonathan Peñaloza
 * Feel free to use this code
 * Cheers!
 */

"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CustomCropper =
    /*#__PURE__*/
    function () {
        function CustomCropper() {
            var _this = this;

            _classCallCheck(this, CustomCropper);

            _defineProperty(this, "crop", function (event) {
                _this.widthLbl.innerText = Math.floor(event.detail.width).toString();
                _this.heightLbl.innerText = Math.floor(event.detail.height).toString();
                _this.xLbl.innerText = Math.floor(event.detail.x).toString();
                _this.yLbl.innerText = Math.floor(event.detail.y).toString();
            });

            _defineProperty(this, "cropToCanvas", function () {
                var imgurl = _this.cropper.getCroppedCanvas().toDataURL();

                var img = document.createElement("img");
                img.src = imgurl;
                var container = document.getElementById('image-container');
                container.innerHTML = null;
                container.appendChild(img);

                _this.makeCropper(img);
            });

            _defineProperty(this, "download", function () {
                var imgurl = _this.cropper.getCroppedCanvas().toDataURL();

                saveAs(_this.dataURItoBlob(imgurl), "edited.png");
            });

            _defineProperty(this, "dataURItoBlob", function (dataURI) {
                var byteString = atob(dataURI.split(',')[1]);
                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
                var ab = new ArrayBuffer(byteString.length);
                var ia = new Uint8Array(ab);

                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ab], {
                    type: mimeString
                });
            });

            this.options = {
                'crop': this.crop
            };
            this.cropper = null;
            this.widthLbl = document.getElementById('width-lbl');
            this.heightLbl = document.getElementById('height-lbl');
            this.xLbl = document.getElementById('x-lbl');
            this.yLbl = document.getElementById('y-lbl');
        }

        _createClass(CustomCropper, [{
            key: "makeCropper",
            value: function makeCropper(image) {
                this.cropper = new Cropper(image, this.options);
            }
        }]);

        return CustomCropper;
    }();

var ImageReader =
    /*#__PURE__*/
    function (_EventEmitter) {
        _inherits(ImageReader, _EventEmitter);

        function ImageReader() {
            var _this2;

            var inputFile = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            _classCallCheck(this, ImageReader);

            _this2 = _possibleConstructorReturn(this, _getPrototypeOf(ImageReader).call(this));

            _defineProperty(_assertThisInitialized(_this2), "fileInputChanged", function (e) {
                if (e.target.files[0] === undefined) {
                    throw new Error('File not selected');
                }

                var type = e.target.files[0].type;

                if (!/image\/(jpg|png|jpeg)/.test(type)) {
                    throw new Error('Only images with the format jpg and png');
                }

                var image = e.target.files[0];

                _this2.fileReader.readAsDataURL(image);
            });

            _defineProperty(_assertThisInitialized(_this2), "loadImageToDOM", function (readerEvent) {
                var container = document.getElementById('image-container');
                var image = new Image();
                image.src = readerEvent.target.result;
                container.innerHTML = null;
                container.appendChild(image);

                _this2.emit('image-loaded', image);
            });

            _this2.inputFile = inputFile;

            if (_this2.inputFile === null) {
                throw new Error("You must pass down an input type file element to the constructor");
            }

            _this2.fileReader = new FileReader();

            _this2.inputFile.addEventListener('change', _this2.fileInputChanged);

            _this2.fileReader.addEventListener('load', _this2.loadImageToDOM);

            return _this2;
        }

        return ImageReader;
    }(EventEmitter);