﻿import { BasicResumeNode } from "../utility/NodeTree";
import { BasicHeaderProps } from "../Header";
import { BasicEntryProps } from "../Entry";
import { makeList } from "./TemplateHelper";
import { BasicIconProps } from "../Icon";
import getDefaultCss, { getRootCss } from "./CssTemplates";
import CssNode from "../utility/CssTree";

export function assuredCss() {
    let defaultCss = getDefaultCss().setProperties([
        ["font-family", "var(--sans-serif)"],
        ["font-size", "11pt"]
    ]);

    /** Header */
    const header = defaultCss.mustFindNode("Header").setProperties([
        ["background", "#eeeeee"],
        ["margin-bottom", "var(--large-spacing)"],
        ["padding", "var(--edge-margin)"],
        ["padding-bottom", "var(--large-spacing)"],
    ]);

    header.add('Rich Text', {
        'text-align': 'right',
        'font-size': '10pt'
    }, '.rich-text');

    header.add('Icon', {
        'height': '24px',
        'vertical-align': 'middle'
    }, 'svg.icon, img.icon');

    let contactLeft = new CssNode("#contact-left", {
        "grid-template-columns": "1fr 30px",
        "grid-column-gap": "var(--small-spacing)",
        "width": "auto",
        "height": "auto",
        "margin-left": "auto"
    });

    let contactRight = new CssNode('#contact-right', {
        "grid-template-columns": "1fr 30px",
        "grid-column-gap": "var(--spacing)",
        "width": "auto",
        "height": "auto"
    });

    /** Section */
    defaultCss.mustFindNode('Section').setProperties([
        ['margin-bottom', 'var(--x-large-spacing)']]
        ).setProperties([
            ['padding-top', 'var(--small-spacing)']
        ], 'Content'
        ).setProperties([
            ["font-family", "var(--serif)"],
            ["font-weight", "bold"],
            ["font-size", "18pt"],
            ["color", "var(--accent)"]
        ], 'Title');

    defaultCss.addNode(contactLeft);
    defaultCss.addNode(contactRight);
    
    defaultCss.add('#main', {
        'padding-left': 'var(--edge-margin)',
        'padding-right': 'var(--edge-margin)',
        'grid-template-columns': '1fr 180px',
        'grid-column-gap': 'var(--large-spacing)'
    });

    const sidebar = defaultCss.add('#sidebar', {});
    sidebar.add('Last Subtitle Field', {
        'margin-left': '0'
    }, 'div.entry > hgroup > h4 span.field-last');

    const subtitleFields = defaultCss.findNode(["Entry", "Title Block", "Subtitle"]);
    if (subtitleFields) {
        subtitleFields.mustFindNode("Middle Fields").add(":before", {
            content: '"|"',
            padding: "0.5em"
        });

        subtitleFields.setProperties([
            ["margin-left", "auto"],
            ["text-align", "right"]
        ], "Last Field");
    }

    return defaultCss;
}

export function assuredRootCss(): CssNode {
    return getRootCss().updateProperties([['--accent', '#315eaa']]);
}

export function assuredNodes(): Array<BasicResumeNode> {
    let contactLeft = {
        "type": "Grid",
        "htmlId": "contact-left",
        "children": [
            {
                type: "Rich Text",
                value: "(123) 456-7890"
            },
            {
                type: "Icon",
                icon: "phone"
            } as BasicIconProps,
            {
                type: "Rich Text",
                value: "mynameis@mail.com"
            },
            {
                type: "Icon",
                icon: "email"
            } as BasicIconProps,
            {
                type: "Rich Text",
                value: "Sometown, USA"
            },
            {
                type: "Icon",
                icon: "map-pin"
            } as BasicIconProps
        ]
    }

    let contactRight = {
        "type": "Grid",
        "htmlId": "contact-right",
        "children": [
            {
                type: "Rich Text",
                value: "My GitHub"
            },
            {
                type: "Icon",
                icon: "github"
            } as BasicIconProps,
            {
                type: "Rich Text",
                value: "mylinkedin"
            },
            {
                type: "Icon",
                icon: "linkedin"
            } as BasicIconProps,
            {
                type: "Rich Text",
                value: "mywebsite.com"
            },
            {
                type: "Icon",
                icon: "globe"
            } as BasicIconProps
        ]
    }

    let header = {
        "type": "Header",
        "value": "<p>Solid <strong>Programmer</strong></p>",
        "children": [
            contactLeft,
            contactRight
        ],
        "subtitle": "<p>Software Engineer</p>",
        "justifyContent": "flex-end",
        "distribution": "left-to-right"
    } as BasicHeaderProps;

    let experience = {
        "type": "Section",
        "value": "Experience",
        "children": [
            {
                "type": "Entry",
                "title": ["Some Startup"],
                "subtitle": ["Software Engineer", "San Francisco, CA", "September 2016 -- Present"],
                "children": [
                    makeList([
                        'Did things while looking at a computer monitor'
                    ])
                ]
            } as BasicEntryProps
        ]
    } as BasicResumeNode;

    let projects = {
        "type": "Section",
        "children": [
            {
                "type": "Entry",
                "title": ["Roomba Ruler"],
                "children": [
                    makeList([
                        'Created an app which allows you to control a swarm of room-cleaning robots'
                    ])
                ]
            },
            {
                "type": "Entry",
                "title": ["Creepy Santa"],
                "children": [
                    makeList([
                        "Created an app which allows you to view your crush's Amazon wish list"
                    ])
                ]
            }
        ],
        "value": "Projects"
    };

    let education = {
        "type": "Section",
        "value": "Education",
        "children": [
            {
                "type": "Entry",
                "title": ["Some College"],
                "subtitle": ["BA Mathematics", "2018", "3.99 GPA"],
                "subtitleBreaks": [1],
                "children": []
            } as BasicEntryProps
        ]
    };

    let data = [
        header,
        {
            "type": "Grid",
            "htmlId": "main",
            "children": [
                {
                    "type": "Column",
                    "children": [
                        experience,
                        projects
                    ]
                },
                {
                    "type": "Column",
                    "children": [
                        education,
                        {
                            "type": "Section",
                            "value": "Languages",
                            "children": [makeList([
                                "COBOL",
                                "Pascal"
                            ])]
                        }
                    ],
                    "htmlId": "sidebar"
                }
            ]
        }
    ]

    return data;
}