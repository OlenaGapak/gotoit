import { offices } from "../game/knowledge/office";

class OfficeModel {
    constructor(size_arg) {
        this.size = offices[size_arg].size;
        this.name = offices[size_arg].name;
        this.space = offices[size_arg].space;
        this.price = offices[size_arg].price;
        this.text = offices[size_arg].text;
    }
}

export default OfficeModel;
