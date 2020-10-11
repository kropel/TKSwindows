"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
var react_1 = require("react");
require("App.scss");
var styled_components_1 = require("styled-components");
var style = {
    border: "1px solid #333",
    padding: "5px"
};
var Grid = styled_components_1["default"].div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  ", "\n"], ["\n  ", "\n"])), { ...style });
var Row = styled_components_1["default"].div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  ", ";\n  border-color: #123;\n  display: flex;\n"], ["\n  ", ";\n  border-color: #123;\n  display: flex;\n"])), { ...style });
var Col = styled_components_1["default"].div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  ", "\n  border-color: #a3b;\n  flex: ", ";\n"], ["\n  ", "\n  border-color: #a3b;\n  flex: ", ";\n"])), { ...style }, function (_a) {
    var _b = _a.size, size = _b === void 0 ? 1 : _b;
    return size;
});
function App() {
    return (react_1["default"].createElement(Grid, null,
        react_1["default"].createElement(Row, null,
            react_1["default"].createElement(Col, null,
                react_1["default"].createElement("p", null, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, nihil reiciendis tempore eos non unde, eaque repudiandae fugiat cumque, laudantium sunt ducimus eius repellat voluptas delectus! Libero repellat consectetur nihil!")),
            react_1["default"].createElement(Col, { size: 2 },
                ' ',
                react_1["default"].createElement("p", null, "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium laboriosam et nesciunt veniam aliquid, excepturi dolores doloribus veritatis unde nobis placeat, dolorum inventore adipisci maxime sed harum facilis voluptates suscipit.")))));
}
exports["default"] = App;
var templateObject_1, templateObject_2, templateObject_3;
