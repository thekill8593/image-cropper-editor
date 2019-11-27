/**
 * Developed by Jonathan Peñaloza
 * Feel free to use this code
 * Cheers!
 */

class CustomCropper {
    constructor() {
        this.options = {
            'crop': this.crop
        };

        this.cropper = null;

        this.widthLbl = document.getElementById('width-lbl');
        this.heightLbl = document.getElementById('height-lbl');
        this.xLbl = document.getElementById('x-lbl');
        this.yLbl = document.getElementById('y-lbl');
    }

    makeCropper (image) {
        this.cropper = new Cropper(image, this.options);
    }

    crop = (event) => {
        this.widthLbl.innerText = Math.floor(event.detail.width).toString();
        this.heightLbl.innerText = Math.floor(event.detail.height).toString();
        this.xLbl.innerText = Math.floor(event.detail.x).toString();
        this.yLbl.innerText = Math.floor(event.detail.y).toString();
    };

    cropToCanvas = () => {
        const imgurl =  this.cropper.getCroppedCanvas().toDataURL();
        let img = document.createElement("img");
        img.src = imgurl;
        const container = document.getElementById('image-container');
        container.innerHTML = null;
        container.appendChild(img);
        this.makeCropper(img);
    };

    download = () => {
        const imgurl =  this.cropper.getCroppedCanvas().toDataURL();
        saveAs(this.dataURItoBlob(imgurl), "edited.png");
    };

    dataURItoBlob = (dataURI) => {
        const byteString = atob(dataURI.split(',')[1]);
        const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        let ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        return new Blob([ab], {type: mimeString});
    };
}

class ImageReader extends EventEmitter{
    constructor(inputFile = null) {
        super();
        this.inputFile = inputFile;
        if (this.inputFile === null) {
            throw new Error("You must pass down an input type file element to the constructor");
        }

        this.fileReader = new FileReader();

        this.inputFile.addEventListener('change', this.fileInputChanged);
        this.fileReader.addEventListener('load', this.loadImageToDOM);
    }

    fileInputChanged = (e) => {
        if (e.target.files[0] === undefined) {
            throw new Error('File not selected');
        }

        const type = e.target.files[0].type;

        if (!/image\/(jpg|png|jpeg)/.test(type)) {
            throw new Error('Only images with the format jpg and png');
        }

        const image = e.target.files[0];
        this.fileReader.readAsDataURL(image);
    };

    loadImageToDOM = (readerEvent) => {
        const container = document.getElementById('image-container');
        const image = new Image();
        image.src = readerEvent.target.result;
        container.innerHTML = null;
        container.appendChild(image);
        this.emit('image-loaded', image);
    };
}