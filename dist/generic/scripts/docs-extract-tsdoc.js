#!/usr/bin/env -S node --enable-source-maps

// scripts/docs-extract-tsdoc.ts
import "dotenv/config.js";
import * as path from "path";
import * as prettier from "prettier";
import ts from "typescript";
import {
  DocNodeKind,
  StandardTags,
  TSDocConfiguration,
  TSDocParser,
  TSDocTagDefinition,
  TSDocTagSyntaxKind
} from "@microsoft/tsdoc";

// common/util/index.ts
import md5 from "blueimp-md5";
import jsonStableStringify2 from "fast-json-stable-stringify";
import { unique } from "radash";
import shajs from "sha.js";
import dayjs from "dayjs";
import Calendar from "dayjs/plugin/calendar.js";
import isBetween from "dayjs/plugin/isBetween.js";

// common/types/index.ts
import jsonStableStringify from "fast-json-stable-stringify";

// common/const/Urls.ts
var TOP_SERVER_HOST = process.env.TOP_SERVER_HOST;
var APP_SERVER_HOST = process.env.APP_SERVER_HOST;
var API_SERVER_HOST = process.env.API_SERVER_HOST;
var API_SERVER_HOST_PRODUCTION = process.env.API_SERVER_HOST_PRODUCTION;
var ADMIN_SERVER_HOST = process.env.ADMIN_SERVER_HOST;
var CONSOLE_SERVER_HOST = process.env.CONSOLE_SERVER_HOST;
var MARKETING_SERVER_HOST = process.env.MARKETING_SERVER_HOST;
var CORD_TO_HOST = process.env.CORD_TO_HOST;
var AUTH0_CUSTOM_LOGIN_DOMAIN = process.env.AUTH0_CUSTOM_LOGIN_DOMAIN;
var DOCS_SERVER_HOST = process.env.DOCS_SERVER_HOST;
var SLACK_APP_REDIRECT_HOST = process.env.SLACK_APP_REDIRECT_HOST;
var TOP_ORIGIN = "https://" + process.env.TOP_SERVER_HOST;
var APP_ORIGIN = "https://" + process.env.APP_SERVER_HOST;
var API_ORIGIN = "https://" + process.env.API_SERVER_HOST;
var ADMIN_ORIGIN = "https://" + process.env.ADMIN_SERVER_HOST;
var CONSOLE_ORIGIN = "https://" + process.env.CONSOLE_SERVER_HOST;
var MARKETING_ORIGIN = "https://" + process.env.MARKETING_SERVER_HOST;
var CORD_TO_ORIGIN = "https://" + process.env.CORD_TO_HOST;
var AUTH0_ORIGIN = "https://" + process.env.AUTH0_CUSTOM_LOGIN_DOMAIN;
var DOCS_ORIGIN = "https://" + process.env.DOCS_SERVER_HOST;
var DOCS_AI_CHATBOT_SERVER_HOST = process.env.DOCS_AI_CHATBOT_SERVER_HOST;
var COMMUNITY_ORIGIN = "https://" + process.env.COMMUNITY_SERVER_HOST;

// common/const/Ids.ts
var AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID;
var DOCS_URLS = {
  tutorials: {
    getProductionReady: {
      addYourBranding: `${DOCS_ORIGIN}/get-started/live-css-editor`
    },
    integrationGuide: `${DOCS_ORIGIN}/get-started/integration-guide`,
    demoApps: `${DOCS_ORIGIN}/get-started/demo-apps`
  },
  components: {
    thread: `${DOCS_ORIGIN}/components/cord-thread`,
    threadList: `${DOCS_ORIGIN}/components/cord-thread-list`,
    threadedComments: `${DOCS_ORIGIN}/components/cord-threaded-comments`,
    sidebar: `${DOCS_ORIGIN}/components/cord-sidebar`,
    inbox: `${DOCS_ORIGIN}/components/cord-inbox`,
    inboxLauncher: `${DOCS_ORIGIN}/components/cord-inbox-launcher`,
    sidebarLauncher: `${DOCS_ORIGIN}/components/cord-sidebar-launcher`,
    composer: `${DOCS_ORIGIN}/components/cord-composer`,
    message: `${DOCS_ORIGIN}/components/cord-message`,
    messageContent: `${DOCS_ORIGIN}/components/cord-message-content`,
    reactions: `${DOCS_ORIGIN}/components/cord-reactions`
  },
  howTo: {
    customThreadedComments: `${DOCS_ORIGIN}/customization/custom-threaded-comments`,
    cssCustomization: `${DOCS_ORIGIN}/customization/css`,
    replacements: `${DOCS_ORIGIN}/customization/custom-react-components/tutorial`
  },
  getStarted: {
    authenticateYourUser: `${DOCS_ORIGIN}/get-started/integration-guide/generate-an-auth-token`
  },
  betaV2Components: {
    threads: `${DOCS_ORIGIN}/components/cord-threads?version=2.0`,
    thread: `${DOCS_ORIGIN}/components/cord-thread?version=2.0`
  }
};

// opensource/sdk-js/packages/react/common/lib/messageNode.ts
import { Element } from "slate";
import { v4 as uuid } from "uuid";

// common/util/index.ts
function isDefined(value) {
  return value !== null && value !== void 0;
}
dayjs.extend(Calendar);
dayjs.extend(isBetween);

// scripts/docs-extract-tsdoc.ts
var TSDOC_CONFIG = new TSDocConfiguration();
TSDOC_CONFIG.addTagDefinitions([
  new TSDocTagDefinition({
    tagName: "@minLength",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@maxLength",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@format",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@minimum",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@maximum",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@minItems",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@maxItems",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  }),
  new TSDocTagDefinition({
    tagName: "@additionalProperties",
    syntaxKind: TSDocTagSyntaxKind.BlockTag
  })
]);
function containerToMarkdown(container, customBlocks) {
  let content = nodesToMarkdown(container.nodes);
  if (customBlocks) {
    for (const block of customBlocks) {
      if (block.blockTag.tagNameWithUpperCase === "@MAXITEMS") {
        content += `

This field has a maximum length of ${containerToMarkdown(
          block.content
        )}.`;
      }
    }
  }
  return content;
}
function nodesToMarkdown(nodes) {
  return nodesToMarkdownInternal(nodes).trim();
}
function nodesToMarkdownInternal(nodes) {
  let result = "";
  for (const node of nodes) {
    switch (node.kind) {
      case DocNodeKind.PlainText:
        result += node.text.replaceAll(
          "(https://docs.cord.com/",
          "(/"
        );
        break;
      case DocNodeKind.EscapedText:
        result += node.decodedText;
        break;
      case DocNodeKind.CodeSpan:
        result += "`" + node.code + "`";
        break;
      case DocNodeKind.FencedCode: {
        const fencedCode = node;
        result += "```" + fencedCode.language + "\n" + fencedCode.code + "\n```";
        break;
      }
      case DocNodeKind.Section:
        result += nodesToMarkdownInternal(node.nodes);
        break;
      case DocNodeKind.SoftBreak:
        result += " ";
        break;
      case DocNodeKind.Paragraph:
        result += nodesToMarkdownInternal(node.nodes) + "\n\n";
        break;
      case DocNodeKind.ErrorText: {
        const errorTextNode = node;
        throw new Error(
          `The docs have a TSDoc formatting error: ${errorTextNode.errorMessage}

${errorTextNode.textExcerpt}`
        );
      }
      case DocNodeKind.BlockTag:
        break;
      default:
        throw new Error(`Unknown doc node kind: ${node.kind}`);
    }
  }
  return result;
}
function extractExamples(customBlocks) {
  const exampleBlocks = customBlocks.filter(
    (b) => b.blockTag.tagNameWithUpperCase === StandardTags.example.tagNameWithUpperCase
  );
  const result = {};
  for (const exampleBlock of exampleBlocks) {
    let nodes = exampleBlock.content.nodes;
    let key = "Example";
    if (nodes[0].kind === DocNodeKind.Paragraph) {
      key = containerToMarkdown(nodes[0]);
      nodes = nodes.slice(1);
    }
    if (nodes[0].kind === DocNodeKind.FencedCode) {
      result[key] = nodes[0].code.trim();
    } else {
      result[key] = nodesToMarkdown(nodes);
    }
  }
  return result;
}
function getTsDoc(node) {
  const sourceText = node.getSourceFile().getFullText();
  const commentRanges = ts.getLeadingCommentRanges(sourceText, node.pos)?.filter(({ pos }) => sourceText.substring(pos, pos + 3) === "/**");
  if (!commentRanges || commentRanges.length === 0) {
    return void 0;
  }
  if (commentRanges.length !== 1) {
    throw new Error("Node had more than one doc comment");
  }
  const commentRange = commentRanges[0];
  const parser = new TSDocParser(TSDOC_CONFIG);
  return parser.parseString(
    sourceText.substring(commentRange.pos, commentRange.end)
  ).docComment;
}
function isHidden(docs) {
  if (docs?.deprecatedBlock) {
    return true;
  }
  if (docs?.privateRemarks) {
    return !!containerToMarkdown(docs.privateRemarks?.content).includes(
      "hidden"
    );
  }
  return false;
}
function isBuiltInType(type) {
  return !!type.symbol?.declarations?.some(
    (d) => d.getSourceFile().hasNoDefaultLib
  );
}
function isForeignType(type) {
  return !!type.symbol?.declarations?.some(
    (d) => d.getSourceFile().fileName.includes("/node_modules/")
  );
}
function isFromBuiltInType(symbol) {
  return !!symbol.declarations?.some(
    (d) => d.parent.getSourceFile().hasNoDefaultLib
  );
}
var UTILITY_TYPES = ["Partial", "Required", "Readonly", "Pick", "Omit"];
function isUtilityType(type) {
  return !!(isBuiltInType(type) && type.aliasSymbol && UTILITY_TYPES.includes(type.aliasSymbol.name));
}
function isUnion(type) {
  return !!(type.flags & ts.TypeFlags.Union);
}
function isStringLiteral(type) {
  return !!(type.flags & ts.TypeFlags.StringLiteral);
}
function isBooleanLiteral(type) {
  return !!(type.flags & ts.TypeFlags.BooleanLiteral);
}
function isPrimitiveType(type) {
  return !!(type.flags & (ts.TypeFlags.String | ts.TypeFlags.Number | ts.TypeFlags.Boolean | ts.TypeFlags.Null | ts.TypeFlags.Undefined));
}
function isObject(type) {
  return !!(type.flags & ts.TypeFlags.Object);
}
function isIntersection(type) {
  return !!(type.flags & ts.TypeFlags.Intersection);
}
function isFunction(type) {
  return type.getCallSignatures().length > 0;
}
function isArray(type) {
  return isObject(type) && type.getSymbol()?.getName() === "Array" && !!(type.objectFlags & ts.ObjectFlags.Reference);
}
function isTuple(type) {
  return isObject(type) && !!(type.objectFlags & ts.ObjectFlags.Reference) && !!(type.target.objectFlags & ts.ObjectFlags.Tuple);
}
function isUndefined(type) {
  return !!(type.flags & ts.TypeFlags.Undefined);
}
function isOptional(symbol) {
  return !!(symbol.flags & ts.SymbolFlags.Optional);
}
function isMethod(symbol) {
  return !!(symbol.flags & ts.SymbolFlags.Method);
}
function isProperty(symbol) {
  return !!(symbol.flags & ts.SymbolFlags.Property);
}
function typeForSymbol(symbol, typeChecker) {
  if (symbol.declarations?.[0]) {
    return [
      typeChecker.getTypeOfSymbolAtLocation(symbol, symbol.declarations[0]),
      getTsDoc(symbol.declarations[0])
    ];
  } else {
    return [typeChecker.getTypeOfSymbol(symbol), void 0];
  }
}
function typeDetails(type, typeChecker, options = {}) {
  return typeDetailsInternal(type, typeChecker, /* @__PURE__ */ new Set(), options);
}
function typeDetailsInternal(type, typeChecker, seenTypes, options = {}) {
  if (seenTypes.has(type)) {
    return {
      type: typeChecker.typeToString(type)
    };
  }
  const originalType = type;
  try {
    seenTypes.add(originalType);
    if (options.removeUndefined) {
      if (isUnion(type)) {
        const undefinedIndex = type.types.findIndex(isUndefined);
        if (undefinedIndex > -1) {
          if (type.types.length === 2) {
            type = type.types[1 - undefinedIndex];
          } else {
            type = {
              ...type,
              types: type.types.filter((t) => !isUndefined(t))
            };
          }
        }
      }
    }
    if (isUnion(type) && type.types.filter(isBooleanLiteral).length === 2) {
      if (type.types.length === 2) {
        return {
          type: "boolean"
        };
      }
      type = {
        ...type,
        types: [
          {
            flags: ts.TypeFlags.Boolean
          },
          ...type.types.filter((t) => !isBooleanLiteral(t))
        ]
      };
    }
    if (isUnion(type)) {
      if (type.types.every(isStringLiteral)) {
        return {
          type: "string",
          enum: type.types.map((t) => t.value)
        };
      }
      if (type.types.every(isPrimitiveType)) {
        return {
          type: type.types.map((t) => typeChecker.typeToString(t))
        };
      }
      return {
        anyOf: type.types.map(
          (t) => typeDetailsInternal(
            t,
            typeChecker,
            seenTypes
          )
        )
      };
    }
    if (isArray(type)) {
      return {
        type: typeChecker.typeToString(type),
        items: typeDetailsInternal(
          typeChecker.getTypeArguments(type)[0],
          typeChecker,
          seenTypes
        )
      };
    }
    if (isTuple(type)) {
      return {
        type: typeChecker.typeToString(type)
      };
    }
    if ((isObject(type) || isIntersection(type)) && !isFunction(type) && (!(isBuiltInType(type) || isForeignType(type)) || isUtilityType(type)) && typeChecker.getPropertiesOfType(type).length > 0) {
      const result = {
        properties: {},
        propertyOrder: [],
        required: []
      };
      for (const prop of typeChecker.getPropertiesOfType(type)) {
        const [propType, docs] = typeForSymbol(prop, typeChecker);
        if (isHidden(docs)) {
          continue;
        }
        result.properties[prop.getName()] = {
          description: docs ? containerToMarkdown(docs.summarySection, docs.customBlocks) : void 0,
          ...typeDetailsInternal(propType, typeChecker, seenTypes, {
            removeUndefined: true
          })
        };
        result.propertyOrder.push(prop.getName());
        if (!isOptional(prop)) {
          result.required.push(prop.getName());
        }
      }
      const typeToString = typeChecker.typeToString(type);
      return {
        // If typeToString starts with a brace, it doesn't have a name and it's
        // just outputting the structure, so call it 'object'
        type: typeToString.startsWith("{") ? "object" : typeToString,
        ...result
      };
    }
    return {
      type: typeChecker.typeToString(type)
    };
  } finally {
    seenTypes.delete(originalType);
  }
}
function extractParameters(declaration, typeChecker) {
  const result = {
    propertyOrder: [],
    required: [],
    properties: {}
  };
  const paramDocs = getTsDoc(declaration)?.params;
  for (const parameter of declaration.parameters) {
    const name = parameter.name.getText();
    const optional = typeChecker.isOptionalParameter(parameter);
    const docBlock = paramDocs?.tryGetBlockByName(name);
    result.properties[name] = {
      description: docBlock ? containerToMarkdown(docBlock.content) : void 0,
      ...typeDetails(typeChecker.getTypeAtLocation(parameter), typeChecker, {
        removeUndefined: optional
      })
    };
    result.propertyOrder.push(name);
    if (!optional) {
      result.required?.push(name);
    }
  }
  return result;
}
function extractSingleFunctionDeclaration(node, declaration, typeChecker) {
  const docs = getTsDoc(declaration);
  if (!docs) {
    return void 0;
  }
  const signature = typeChecker.getSignatureFromDeclaration(declaration);
  return {
    name: node.getName(),
    summary: containerToMarkdown(docs.summarySection),
    examples: extractExamples(docs.customBlocks),
    parameters: extractParameters(declaration, typeChecker),
    returns: {
      description: docs.returnsBlock ? containerToMarkdown(docs.returnsBlock.content) : void 0,
      ...typeDetails(signature.getReturnType(), typeChecker)
    }
  };
}
function extractFunction(symbol, typeChecker) {
  const declarations = (symbol.getDeclarations() ?? []).filter(
    (d) => ts.isFunctionDeclaration(d) || ts.isMethodSignature(d)
  );
  if (declarations.length === 0) {
    return void 0;
  }
  if (declarations.length === 1) {
    return extractSingleFunctionDeclaration(
      symbol,
      declarations[0],
      typeChecker
    );
  } else {
    return {
      overloaded: true,
      overloads: declarations.filter((d) => ts.isMethodSignature(d) || !d.body).map(
        (declaration) => extractSingleFunctionDeclaration(symbol, declaration, typeChecker)
      ).filter(isDefined)
    };
  }
}
function extractModule(moduleSymbol, typeChecker) {
  const result = {};
  typeChecker.getExportsOfModule(moduleSymbol).forEach((exported) => {
    switch (exported.flags) {
      case ts.SymbolFlags.Alias: {
        const aliased = typeChecker.getAliasedSymbol(exported);
        switch (aliased.flags) {
          case ts.SymbolFlags.ValueModule:
            result[exported.getName()] = extractModule(aliased, typeChecker);
            break;
          case ts.SymbolFlags.Interface:
            processInterface(aliased, typeChecker, result);
            break;
        }
        break;
      }
      case ts.SymbolFlags.Interface:
      case ts.SymbolFlags.TypeAlias: {
        processInterface(exported, typeChecker, result);
        break;
      }
      case ts.SymbolFlags.Function: {
        const method = extractFunction(exported, typeChecker);
        if (method) {
          result[exported.getName()] = method;
        }
        break;
      }
    }
  });
  return result;
}
function processInterface(exported, typeChecker, result) {
  const ifaceData = {
    name: exported.getName(),
    methods: { methodOrder: [], required: [], methods: {} },
    properties: {
      properties: {},
      propertyOrder: [],
      required: []
    }
  };
  const type = typeChecker.getDeclaredTypeOfSymbol(exported);
  for (const member of typeChecker.getPropertiesOfType(type)) {
    if (isFromBuiltInType(member)) {
      continue;
    }
    if (isProperty(member)) {
      const [memberType, docs] = typeForSymbol(member, typeChecker);
      if (isHidden(docs)) {
        continue;
      }
      ifaceData.properties.properties[member.getName()] = {
        ...typeDetails(memberType, typeChecker, {
          removeUndefined: isOptional(member)
        }),
        description: docs ? containerToMarkdown(docs.summarySection, docs.customBlocks) : void 0
      };
      ifaceData.properties.propertyOrder.push(member.getName());
      if (!isOptional(member)) {
        ifaceData.properties.required.push(member.getName());
      }
    } else if (isMethod(member)) {
      const method = extractFunction(member, typeChecker);
      if (method) {
        ifaceData.methods.methods[member.getName()] = method;
        ifaceData.methods.methodOrder.push(member.getName());
        if (!isOptional(member)) {
          ifaceData.methods.required.push(member.getName());
        }
      }
    }
  }
  if (Object.keys(ifaceData.methods.methods).length > 0 || Object.keys(ifaceData.properties.properties).length > 0) {
    result[exported.getName()] = ifaceData;
  }
}
function packageToPath(sdkPackage) {
  return path.resolve(`opensource/sdk-js/packages/${sdkPackage}/index.ts`);
}
function extractPackage(sdkPackage, tsProgram) {
  const typeChecker = tsProgram.getTypeChecker();
  const sourceFile = tsProgram.getSourceFile(packageToPath(sdkPackage));
  return extractModule(
    typeChecker.getSymbolAtLocation(sourceFile),
    typeChecker
  );
}
var PACKAGES = [
  "types",
  "react",
  "chatbot-base",
  "chatbot-anthropic",
  "chatbot-openai"
];
var main = async () => {
  const tsCompilerHost = {
    ...ts.createCompilerHost({}),
    // make sure we don't write files
    writeFile: () => {
    },
    // don't give it access to any directories
    getDirectories: () => []
  };
  const tsProgram = ts.createProgram(
    PACKAGES.map(packageToPath),
    {
      target: ts.ScriptTarget.ES2021,
      moduleResolution: ts.ModuleResolutionKind.NodeJs,
      strictNullChecks: true
    },
    tsCompilerHost
  );
  const schemaOut = Object.fromEntries(
    PACKAGES.map((p) => [p, extractPackage(p, tsProgram)])
  );
  console.log(
    await prettier.format(
      `
// @generated
// npm run docs-codegen
/* eslint-disable */
export default ${JSON.stringify(schemaOut)} as const;`,
      { filepath: "out.ts", ...await prettier.resolveConfig("out.ts") }
    )
  );
};
Promise.resolve(main()).catch((err) => {
  console.error(err);
  process.exit(1);
});

//# sourceMappingURL=docs-extract-tsdoc.js.map
