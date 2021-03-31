import $ from "jquery";
import { JSDOM } from "jsdom";

function setTestDiv(text: string) {
    $('#test_div').html(`<p>${text}</p>`);
}

describe("html_tests", () => {
    it("should set text on div", () => {
        document.body.innerHTML =
            `<div id="test_div"></div>`;

        let htmlElement = $('#test_div');

        expect(htmlElement.length).toBeGreaterThan(0);

        setTestDiv("Hello World");

        expect(htmlElement.html()).toContain("Hello World");
    });

    // npm install jsdom ?
    // import JSDOM from jsdom

    const htmlWithClickEvent = `
        <body>
            <script type="text/javascript">
                function handle_click_event() {
                    console.log("handle_click_event() called.");
                }
            </script>
            <div id="click_handler_div"
                onclick="handle_click_event()"
            >Click Here</div>
        </body>
        `;

    it("should trigger an onclick DOM event", () => {

        let dom = new JSDOM(
            htmlWithClickEvent,
            { runScripts: "dangerously" });

        let clickHandler = <HTMLElement>
            dom.window.document.querySelector("#click_handler_div");
        let clickEventSpy = jest.spyOn(clickHandler, "click");
        clickHandler.click();
        expect(clickEventSpy).toHaveBeenCalled();
    });
});


