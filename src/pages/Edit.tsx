import React, {
    useEffect,
    useState,
    useCallback,
    useRef,
    KeyboardEvent,
    PointerEvent
  } from 'react';
  import Editor from '@monaco-editor/react';
  // Babel Standalone for TSX -> JS
  import * as Babel from '@babel/standalone';
  import { Code, Menu, X } from 'lucide-react';
  
  import { Octokit } from 'octokit';
  
  import { useLocation } from 'react-router-dom';
  
  const token = localStorage.getItem('githubToken');
  const HARD_CODED_DEPLOY_TOKEN = token;
  
  const REPO_OWNER = 'ryanhlewis';
  const REPO_NAME = 'serverlessportfolio';
  const REPO_BRANCH = 'main';
  
  interface GHFile {
    path: string;
    sha: string;
    url: string;
    type: string;
  }
  
  export default function Edit() {
    const passedLocation = useLocation();
    let { location: passedStateLocation } = passedLocation.state || {};
    if (!passedStateLocation) {
      passedStateLocation = passedLocation;
    }
  
    const [files, setFiles] = useState<GHFile[]>([]);
    const [selectedFile, setSelectedFile] = useState<GHFile | null>(null);
  
    const [originalCode, setOriginalCode] = useState('');
    const [code, setCode] = useState('');
    const [previewHTML, setPreviewHTML] = useState('');
  
    // Editor ref
    const editorRef = useRef<any>(null);
  
    // Toggles for showing/hiding columns
    const [isFileListOpen, setIsFileListOpen] = useState(true);
    const [isEditorOpen, setIsEditorOpen] = useState(true);
  
    // Column widths in px
    const [leftWidth, setLeftWidth] = useState<number>(300);   // file list
    const [rightWidth, setRightWidth] = useState<number>(400); // editor
  
    // Keep an Octokit instance in a ref
    const octokitRef = useRef<Octokit | null>(null);
  
    // ---------------------------
    // Babel plugin
    // ---------------------------
    function fullFixedPlugin(babel: any) {
      const { types: t, template } = babel;
  
      let linkImported = false;
      let photoAlbumNeeded = false;
      let photoStubNeeded = false;
      const lucideIconNames = new Set();
  
      const buildLinkHelper = template(`
        const Link = React.forwardRef(function MyLink(props, ref) {
          const { to, children, onClick, ...rest } = props;
          function handleClick(e) {
            if (onClick) onClick(e);
            if (!e.defaultPrevented) {
              e.preventDefault();
              console.log("Clicked Link to:", to);
            }
          }
          return React.createElement(
            "a",
            { href: to, ref, onClick: handleClick, ...rest },
            children
          );
        });
      `);
  
      const buildPhotoAlbumHelper = template(`
        function PhotoAlbum(props) {
          const { photos = [], layout, ...rest } = props;
          return React.createElement(
            "div",
            { style: { border: "1px dashed gray" }, ...rest },
            React.createElement("h3", null, "Stub PhotoAlbum (layout=", layout, ")"),
            photos.map((p, i) =>
              React.createElement(
                Photo,
                { key: i, src: p.src, width: p.width, height: p.height, alt: p.alt || "" }
              )
            )
          );
        }
      `);
  
      const buildPhotoHelper = template(`
        function Photo(props) {
          const { src, width, height, alt, ...rest } = props;
          return React.createElement(
            "img",
            { src, alt: alt || "", width, height, ...rest }
          );
        }
      `);
  
      const buildLucideIconHelper = template(`
        function LucideIcon(props) {
          const { name, size = 24, ...rest } = props;
          if (!window.lucide || !window.lucide[name]) {
            return null;
          }
          const [tag, defaultAttrs, children] = window.lucide[name];
          return React.createElement(
            tag,
            { ...defaultAttrs, width: size, height: size, ...rest },
            children.map(([childTag, childAttrs], i) =>
              React.createElement(childTag, { ...childAttrs, key: i })
            )
          );
        }
      `);
  
      return {
        visitor: {
          ImportDeclaration(path: any) {
            const importSource = path.node.source.value;
  
            if (importSource === 'react-router-dom') {
              path.node.specifiers.forEach((spec: any) => {
                if (t.isImportSpecifier(spec) && spec.imported.name === 'Link') {
                  linkImported = true;
                }
              });
              path.remove();
              return;
            }
  
            if (importSource === 'react-photo-album') {
              path.node.specifiers.forEach((spec: any) => {
                if (t.isImportDefaultSpecifier(spec) && spec.local.name === 'PhotoAlbum') {
                  photoAlbumNeeded = true;
                }
                if (t.isImportSpecifier(spec) && spec.imported.name === 'Photo') {
                  photoStubNeeded = true;
                }
              });
              // We'll also forcibly define Photo
              photoStubNeeded = true;
              path.remove();
              return;
            }
  
            if (importSource === 'lucide-react') {
              path.node.specifiers.forEach((spec: any) => {
                if (t.isImportSpecifier(spec)) {
                  lucideIconNames.add(spec.imported.name);
                }
              });
              path.remove();
              return;
            }
  
            // Remove everything else
            path.remove();
          },
  
          JSXElement(path: any) {
            const { types: t } = babel;
            const openingEl = path.node.openingElement;
            if (!t.isJSXIdentifier(openingEl.name)) return;
  
            const elementName = openingEl.name.name;
            // If it's a lucide icon, e.g. <Globe />
            if (lucideIconNames.has(elementName)) {
              const nameAttr = t.jsxAttribute(
                t.jsxIdentifier('name'),
                t.stringLiteral(elementName)
              );
              const newOpeningEl = t.jsxOpeningElement(
                t.jsxIdentifier('LucideIcon'),
                [nameAttr, ...openingEl.attributes],
                openingEl.selfClosing
              );
              if (openingEl.selfClosing) {
                path.replaceWith(t.jsxElement(newOpeningEl, null, [], true));
              } else {
                const closingEl = t.jsxClosingElement(t.jsxIdentifier('LucideIcon'));
                path.replaceWith(
                  t.jsxElement(newOpeningEl, closingEl, path.node.children, false)
                );
              }
            }
          },
  
          ExportDefaultDeclaration(path: any) {
            const decl = path.node.declaration;
            if (t.isIdentifier(decl)) {
              path.replaceWith(
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.memberExpression(t.identifier('window'), t.identifier('default')),
                    decl
                  )
                )
              );
            } else if (t.isFunctionDeclaration(decl)) {
              const funcId = decl.id || path.scope.generateUidIdentifier('defaultFunc');
              path.replaceWithMultiple([
                t.functionDeclaration(funcId, decl.params, decl.body, decl.generator, decl.async),
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.memberExpression(t.identifier('window'), t.identifier('default')),
                    funcId
                  )
                ),
              ]);
            } else {
              const uniqueId = path.scope.generateUidIdentifier('defaultExport');
              path.replaceWithMultiple([
                t.variableDeclaration('const', [t.variableDeclarator(uniqueId, decl)]),
                t.expressionStatement(
                  t.assignmentExpression(
                    '=',
                    t.memberExpression(t.identifier('window'), t.identifier('default')),
                    uniqueId
                  )
                ),
              ]);
            }
          },
  
          Program: {
            exit(path: any) {
              if (linkImported) {
                const linkAST = buildLinkHelper();
                path.unshiftContainer('body', linkAST);
              }
              if (photoStubNeeded) {
                const photoAST = buildPhotoHelper();
                path.unshiftContainer('body', photoAST);
              }
              if (photoAlbumNeeded) {
                const albumAST = buildPhotoAlbumHelper();
                path.unshiftContainer('body', albumAST);
              }
              if (lucideIconNames.size > 0) {
                const lucideIconAST = buildLucideIconHelper();
                path.unshiftContainer('body', lucideIconAST);
              }
            },
          },
        },
      };
    }
  
    // ---------------------------
    // Handle Babel transpile + preview
    // ---------------------------
    const handleTranspile = useCallback(
      (newCode?: string) => {
        try {
          const codeToTranspile = newCode ?? code;
          const transformResult = Babel.transform(codeToTranspile, {
            filename: 'file.tsx',
            presets: ['react', 'typescript'],
            plugins: [fullFixedPlugin],
          });
  
          const compiled = transformResult.code || '';
  
          const currentTheme =
            (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
  
          const script = `
  <html class="${currentTheme === 'dark' ? 'dark' : ''}">
    <head>
      <!-- Tailwind CSS -->
      <script src="https://cdn.jsdelivr.net/npm/tailwindcss-cdn@3.4.10/tailwindcss.js"></script>
      <script>
        tailwind.config = {
            darkMode: 'class',
        }
      </script>
      <!-- Lucide Icons -->
      <script src="https://unpkg.com/lucide@latest"></script>
      <!-- React, ReactDOM -->
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <!-- React Router DOM v5 -->
      <script src="https://unpkg.com/react-router-dom@5.3.4/umd/react-router-dom.js"></script>
    </head>
    <body class="p-4">
      <div id="root"></div>
      <script>
        window.React = React;
        window.ReactDOM = ReactDOM;
        window.ReactRouterDOM = ReactRouterDOM;
        lucide.createIcons();
  
        const { useState, useEffect, useCallback, useRef } = React;
  
        ${compiled}
  
        try {
          const mainComp = window.default;
          if (!mainComp) {
            document.getElementById('root').innerHTML = "No default export found in your code.";
          } else {
            const rootElement = React.createElement(mainComp);
            ReactDOM.render(rootElement, document.getElementById('root'));
          }
        } catch (err) {
          document.getElementById('root').innerHTML = "Error rendering: " + err;
        }
      </script>
    </body>
  </html>
  `;
          setPreviewHTML(script);
        } catch (err: any) {
          console.error('Error transpiling code:', err);
          alert(`Error transpiling code:\n${err.message}`);
        }
      },
      [code]
    );
  
    function base64EncodeUnicode(str: string): string {
      // encode UTF-8 → URL-escape → unescape → btoa
      return btoa(unescape(encodeURIComponent(str)));
    }
  
    // ---------------------------
    // Push changes to GitHub via Octokit
    // ---------------------------
    const handlePushToGitHub = useCallback(async () => {
      if (!selectedFile) {
        alert('No file selected');
        return;
      }
      // If there's no diff, don't push
      if (code === originalCode) {
        alert('No changes to push!');
        return;
      }
  
      // Use token from localStorage
      const token = localStorage.getItem('githubToken');
      if (!token) {
        alert('No GitHub token found.');
        return;
      }
  
      // Ensure we have an Octokit instance
      if (!octokitRef.current) {
        octokitRef.current = new Octokit({ auth: token });
      }
      const octokit = octokitRef.current;
  
      try {
        console.log("handlePushToGitHub => path:", selectedFile.path);
        const fileSha = selectedFile.sha;
        console.log("handlePushToGitHub => fileSha:", fileSha);
  
        // 2) Base64-encode the *raw* code from our editor state
        const contentBase64 = base64EncodeUnicode(code);
  
        // 3) Commit the updated code
        const putResp = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
          owner: REPO_OWNER,
          repo: REPO_NAME,
          path: selectedFile.path,
          message: `Update ${selectedFile.path} via in-browser editor`,
          content: contentBase64,
          sha: fileSha,
          branch: REPO_BRANCH,
        });
  
        if (putResp.status >= 400) {
          console.error('Failed to commit changes:', putResp);
          alert('Failed to commit changes. See console for details.');
          return;
        }
  
        alert('Changes pushed successfully!');
        setOriginalCode(code); // Mark as clean
      } catch (err) {
        console.error('Error pushing changes via Octokit:', err);
        alert('Error pushing changes via Octokit. See console for details.');
      }
    }, [selectedFile, code, originalCode]);
  
    // ---------------------------
    // Handle selecting a file => fetch content => transpile
    // ---------------------------
    const handleSelectFile = useCallback(
      async (file: GHFile) => {
        const token = localStorage.getItem('githubToken');
        if (!token) {
          alert('No GitHub token found');
          return;
        }
  
        // Ensure we have an Octokit instance
        if (!octokitRef.current) {
          octokitRef.current = new Octokit({ auth: token });
        }
        const octokit = octokitRef.current;
  
        try {
          // GET /repos/{owner}/{repo}/contents/{file.path}?ref={branch}
          // with Accept: raw
          const resp = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: REPO_OWNER,
            repo: REPO_NAME,
            path: file.path,
            ref: REPO_BRANCH,
            headers: {
              Accept: 'application/vnd.github.v3.raw',
            },
          });
  
          // `resp.data` is a string or Buffer if we used raw
          const text = typeof resp.data === 'string' ? resp.data : '';
          setOriginalCode(text);
          setCode(text);
          setSelectedFile(file);
  
          // Immediately transpile new code
          handleTranspile(text);
        } catch (err) {
          console.error('Error fetching file content via Octokit:', err);
        }
      },
      [handleTranspile]
    );
  
    // Editor onChange
    const handleEditorChange = useCallback((value?: string) => {
      setCode(value || '');
    }, []);
  
    // Ctrl+S => transpile
    const handleEditorKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        handleTranspile();
      }
    };
  
    // ---------------------------
    // Levenshtein-based string similarity
    // ---------------------------
    const getSimilarity = (str1: string, str2: string) => {
      const distance = (a: string, b: string): number => {
        const dp = Array(a.length + 1)
          .fill(null)
          .map(() => Array(b.length + 1).fill(0));
  
        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;
  
        for (let i = 1; i <= a.length; i++) {
          for (let j = 1; j <= b.length; j++) {
            dp[i][j] =
              a[i - 1] === b[j - 1]
                ? dp[i - 1][j - 1]
                : Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
          }
        }
        return dp[a.length][b.length];
      };
  
      return (
        1 -
        distance(str1.toLowerCase(), str2.toLowerCase()) /
          Math.max(str1.length, str2.length)
      );
    };
  
    // Transform route to inferred .tsx file path
    function routeToTSX(route: string): string | null {
      const parts = route.split('/').filter(Boolean);
      if (parts.length < 2) return null;
  
      const transformedPath = `src/pages${route
        .split('/')
        .map((segment) =>
          segment
            .split('-')
            .map((word, i) =>
              i === 0
                ? word
                : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('')
        )
        .join('/')}.tsx`;
  
      return transformedPath;
    }
  
    // ---------------------------------------
    // 1) Fetch repo files only on first load
    // 2) Then auto-select a file from the route once
    // ---------------------------------------
    const didFetchRef = useRef(false);
    const hasSelectedFileRef = useRef(false);
  
    useEffect(() => {
      if (didFetchRef.current) return;
  
      didFetchRef.current = true; // ensure we only do this once
      const token = localStorage.getItem('githubToken');
      if (!token) {
        alert('No GitHub token found in localStorage.githubToken');
        return;
      }
  
      // Prepare Octokit
      if (!octokitRef.current) {
        octokitRef.current = new Octokit({ auth: token });
      }
      const octokit = octokitRef.current;
  
      async function fetchRepoFiles() {
        try {
          // GET /repos/{owner}/{repo}/git/trees/{tree_sha}?recursive=1
          const resp = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{tree_sha}', {
            owner: REPO_OWNER,
            repo: REPO_NAME,
            tree_sha: REPO_BRANCH,
            recursive: '1',
          });
  
          const data = resp.data;
          if (!data.tree) {
            console.error('No tree found in the response:', data);
            return;
          }
  
          const tsxFiles: GHFile[] = data.tree
            .filter((item: any) => item.path.endsWith('.tsx') && item.type === 'blob')
            .map((item: any) => ({
              path: item.path,
              sha: item.sha,
              url: item.url,
              type: item.type,
            }));
  
          setFiles(tsxFiles);
  
          // Now that we have files, auto-select the best match from our route:
          const transformedPath = routeToTSX(passedStateLocation.pathname);
          console.log('pathname:', passedStateLocation.pathname);
          console.log('transformedPath:', transformedPath);
  
          if (transformedPath && tsxFiles.length > 0) {
            // Fuzzy match the transformed path with the available files
            const closestMatch = tsxFiles
              .map((file: any) => ({
                file,
                similarity: getSimilarity(transformedPath, file.path),
              }))
              .sort((a, b) => b.similarity - a.similarity)[0];
  
            console.log('closestMatch:', closestMatch);
            if (closestMatch && closestMatch.similarity > 0.5) {
              handleSelectFile(closestMatch.file);
              hasSelectedFileRef.current = true;
            }
          }
        } catch (err) {
          console.error('Error fetching file list via Octokit:', err);
        }
      }
      fetchRepoFiles();
    }, [passedStateLocation.pathname, handleSelectFile]);
  
    // Toggle file list
    const toggleFileList = useCallback(() => {
      setIsFileListOpen((val) => !val);
    }, []);
  
    // Toggle editor
    const toggleEditor = useCallback(() => {
      setIsEditorOpen((val) => !val);
    }, []);
  
    // ========= Left Gutter Dragging =========
    const leftGutterPointerDown = (e: PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
    };
    const leftGutterPointerMove = (e: PointerEvent) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        const newLeft = Math.max(0, e.clientX);
        setLeftWidth(newLeft);
      }
    };
    const leftGutterPointerUp = (e: PointerEvent) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    };
  
    // ========= Right Gutter Dragging =========
    const rightGutterPointerDown = (e: PointerEvent) => {
      e.currentTarget.setPointerCapture(e.pointerId);
    };
    const rightGutterPointerMove = (e: PointerEvent) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        const bodyWidth = document.body.clientWidth;
        const fromRight = bodyWidth - e.clientX;
        setRightWidth(Math.max(0, fromRight));
      }
    };
    const rightGutterPointerUp = (e: PointerEvent) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    };
  
    return (
      <>
        <style>
          {`
            /* Gutter styling to highlight on hover + show col-resize */
            .myGutter {
              background-color: #f8f9fa;
            }
            .myGutter:hover {
              background-color: #dee2e6;
              cursor: col-resize;
            }
          `}
        </style>
  
        <section className="pt-16 h-screen flex flex-col" onKeyDown={handleEditorKeyDown}>
          <div className="flex flex-row flex-grow overflow-hidden">
            {/* Left Column => File List */}
            {isFileListOpen && (
              <div
                style={{ width: leftWidth }}
                className="border-r border-gray-300 flex flex-col overflow-auto"
              >
                <h2 className="font-bold text-lg p-2 border-b border-gray-300">
                  Files (.tsx)
                </h2>
                {files.map((f) => (
                  <div
                    key={f.sha}
                    onClick={() => handleSelectFile(f)}
                    className={`cursor-pointer px-2 py-1 ${
                      selectedFile && f.path === selectedFile.path
                        ? 'bg-blue-100 dark:bg-blue-800'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {f.path}
                  </div>
                ))}
              </div>
            )}
  
            {/* Left Gutter */}
            {isFileListOpen && (
              <div
                className="myGutter w-2 border-r border-gray-300"
                onPointerDown={leftGutterPointerDown}
                onPointerMove={leftGutterPointerMove}
                onPointerUp={leftGutterPointerUp}
              />
            )}
  
            {/* Middle => Preview */}
            <div className="relative flex-grow border-r border-gray-300">
              {/* Toggle Buttons */}
              <button
                onClick={toggleFileList}
                className="absolute top-0 left-0 m-2 w-10 h-10 flex items-center justify-center 
                           bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                           text-gray-600 dark:text-gray-300 rounded-bl z-10"
              >
                {isFileListOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
  
              <button
                onClick={toggleEditor}
                className="absolute top-0 right-0 m-2 w-10 h-10 flex items-center justify-center 
                           bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                           text-gray-600 dark:text-gray-300 rounded-br z-10"
              >
                {isEditorOpen ? <X className="w-6 h-6" /> : <Code className="w-6 h-6" />}
              </button>
  
              {/* Iframe */}
              <iframe
                title="Live Preview"
                className="w-full h-full"
                srcDoc={previewHTML}
              />
            </div>
  
            {/* Right Gutter */}
            {isEditorOpen && (
              <div
                className="myGutter w-2 border-r border-gray-300"
                onPointerDown={rightGutterPointerDown}
                onPointerMove={rightGutterPointerMove}
                onPointerUp={rightGutterPointerUp}
              />
            )}
  
            {/* Right => Editor */}
            {isEditorOpen && (
              <div
                style={{ width: rightWidth }}
                className="flex flex-col"
              >
                <div className="p-2 border-b border-gray-300 flex items-center justify-between">
                  <span className="font-semibold">
                    {selectedFile ? selectedFile.path : 'No file selected'}
                  </span>
                  <button
                    onClick={handlePushToGitHub}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                    disabled={!selectedFile}
                  >
                    Build &amp; Push
                  </button>
                </div>
  
                <div className="flex-grow">
                  <Editor
                    height="100%"
                    language="typescript"
                    theme="vs-dark"
                    value={code}
                    onChange={handleEditorChange}
                    onMount={(editor, monaco) => {
                      editorRef.current = editor;
  
                      if (monaco?.languages?.typescript?.typescriptDefaults) {
                        monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
                          noSemanticValidation: true,
                          noSyntaxValidation: true,
                        });
                      }
                      if (monaco?.languages?.javascript?.javascriptDefaults) {
                        monaco.languages.javascript.javascriptDefaults.setDiagnosticsOptions({
                          noSemanticValidation: true,
                          noSyntaxValidation: true,
                        });
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>
      </>
    );
  }
  