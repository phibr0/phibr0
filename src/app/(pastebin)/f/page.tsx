'use client';

const bundledLanguagesInfo = [
  {
    id: 'abap',
    name: 'ABAP',
  },
  {
    id: 'actionscript-3',
    name: 'ActionScript',
  },
  {
    id: 'ada',
    name: 'Ada',
  },
  {
    id: 'angular-html',
    name: 'Angular HTML',
  },
  {
    id: 'angular-ts',
    name: 'Angular TypeScript',
  },
  {
    id: 'apache',
    name: 'Apache Conf',
  },
  {
    id: 'apex',
    name: 'Apex',
  },
  {
    id: 'apl',
    name: 'APL',
  },
  {
    id: 'applescript',
    name: 'AppleScript',
  },
  {
    id: 'ara',
    name: 'Ara',
  },
  {
    id: 'asm',
    name: 'Assembly',
  },
  {
    id: 'astro',
    name: 'Astro',
  },
  {
    id: 'awk',
    name: 'AWK',
  },
  {
    id: 'ballerina',
    name: 'Ballerina',
  },
  {
    id: 'bat',
    name: 'Batch File',
  },
  {
    id: 'beancount',
    name: 'Beancount',
  },
  {
    id: 'berry',
    name: 'Berry',
  },
  {
    id: 'bibtex',
    name: 'BibTeX',
  },
  {
    id: 'bicep',
    name: 'Bicep',
  },
  {
    id: 'blade',
    name: 'Blade',
  },
  {
    id: 'c',
    name: 'C',
  },
  {
    id: 'cadence',
    name: 'Cadence',
  },
  {
    id: 'clarity',
    name: 'Clarity',
  },
  {
    id: 'clojure',
    name: 'Clojure',
  },
  {
    id: 'cmake',
    name: 'CMake',
  },
  {
    id: 'cobol',
    name: 'COBOL',
  },
  {
    id: 'codeql',
    name: 'CodeQL',
  },
  {
    id: 'coffee',
    name: 'CoffeeScript',
  },
  {
    id: 'cpp',
    name: 'C++',
  },
  {
    id: 'crystal',
    name: 'Crystal',
  },
  {
    id: 'csharp',
    name: 'C#',
  },
  {
    id: 'css',
    name: 'CSS',
  },
  {
    id: 'csv',
    name: 'CSV',
  },
  {
    id: 'cue',
    name: 'CUE',
  },
  {
    id: 'cypher',
    name: 'Cypher',
  },
  {
    id: 'd',
    name: 'D',
  },
  {
    id: 'dart',
    name: 'Dart',
  },
  {
    id: 'dax',
    name: 'DAX',
  },
  {
    id: 'diff',
    name: 'Diff',
  },
  {
    id: 'docker',
    name: 'Dockerfile',
  },
  {
    id: 'dream-maker',
    name: 'Dream Maker',
  },
  {
    id: 'elixir',
    name: 'Elixir',
  },
  {
    id: 'elm',
    name: 'Elm',
  },
  {
    id: 'erb',
    name: 'ERB',
  },
  {
    id: 'erlang',
    name: 'Erlang',
  },
  {
    id: 'fish',
    name: 'Fish',
  },
  {
    id: 'fortran-fixed-form',
    name: 'Fortran (Fixed Form)',
  },
  {
    id: 'fortran-free-form',
    name: 'Fortran (Free Form)',
  },
  {
    id: 'fsharp',
    name: 'F#',
  },
  {
    id: 'gdresource',
    name: 'GDResource',
  },
  {
    id: 'gdscript',
    name: 'GDScript',
  },
  {
    id: 'gdshader',
    name: 'GDShader',
  },
  {
    id: 'gherkin',
    name: 'Gherkin',
  },
  {
    id: 'git-commit',
    name: 'Git Commit Message',
  },
  {
    id: 'git-rebase',
    name: 'Git Rebase Message',
  },
  {
    id: 'gleam',
    name: 'Gleam',
  },
  {
    id: 'glimmer-js',
    name: 'Glimmer JS',
  },
  {
    id: 'glimmer-ts',
    name: 'Glimmer TS',
  },
  {
    id: 'glsl',
    name: 'GLSL',
  },
  {
    id: 'gnuplot',
    name: 'Gnuplot',
  },
  {
    id: 'go',
    name: 'Go',
  },
  {
    id: 'graphql',
    name: 'GraphQL',
  },
  {
    id: 'groovy',
    name: 'Groovy',
  },
  {
    id: 'hack',
    name: 'Hack',
  },
  {
    id: 'haml',
    name: 'Ruby Haml',
  },
  {
    id: 'handlebars',
    name: 'Handlebars',
  },
  {
    id: 'haskell',
    name: 'Haskell',
  },
  {
    id: 'hcl',
    name: 'HashiCorp HCL',
  },
  {
    id: 'hjson',
    name: 'Hjson',
  },
  {
    id: 'hlsl',
    name: 'HLSL',
  },
  {
    id: 'html',
    name: 'HTML',
  },
  {
    id: 'html-derivative',
    name: 'HTML (Derivative)',
  },
  {
    id: 'http',
    name: 'HTTP',
  },
  {
    id: 'imba',
    name: 'Imba',
  },
  {
    id: 'ini',
    name: 'INI',
  },
  {
    id: 'java',
    name: 'Java',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
  },
  {
    id: 'jinja',
    name: 'Jinja',
  },
  {
    id: 'jison',
    name: 'Jison',
  },
  {
    id: 'json',
    name: 'JSON',
  },
  {
    id: 'json5',
    name: 'JSON5',
  },
  {
    id: 'jsonc',
    name: 'JSON with Comments',
  },
  {
    id: 'jsonl',
    name: 'JSON Lines',
  },
  {
    id: 'jsonnet',
    name: 'Jsonnet',
  },
  {
    id: 'jssm',
    name: 'JSSM',
  },
  {
    id: 'jsx',
    name: 'JSX',
  },
  {
    id: 'julia',
    name: 'Julia',
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
  },
  {
    id: 'kusto',
    name: 'Kusto',
  },
  {
    id: 'latex',
    name: 'LaTeX',
  },
  {
    id: 'less',
    name: 'Less',
  },
  {
    id: 'liquid',
    name: 'Liquid',
  },
  {
    id: 'lisp',
    name: 'Lisp',
  },
  {
    id: 'logo',
    name: 'Logo',
  },
  {
    id: 'lua',
    name: 'Lua',
  },
  {
    id: 'make',
    name: 'Makefile',
  },
  {
    id: 'markdown',
    name: 'Markdown',
  },
  {
    id: 'marko',
    name: 'Marko',
  },
  {
    id: 'matlab',
    name: 'MATLAB',
  },
  {
    id: 'mdc',
    name: 'MDC',
  },
  {
    id: 'mdx',
    name: 'MDX',
  },
  {
    id: 'mermaid',
    name: 'Mermaid',
  },
  {
    id: 'mojo',
    name: 'Mojo',
  },
  {
    id: 'move',
    name: 'Move',
  },
  {
    id: 'narrat',
    name: 'Narrat Language',
  },
  {
    id: 'nextflow',
    name: 'Nextflow',
  },
  {
    id: 'nginx',
    name: 'Nginx',
  },
  {
    id: 'nim',
    name: 'Nim',
  },
  {
    id: 'nix',
    name: 'Nix',
  },
  {
    id: 'nushell',
    name: 'nushell',
  },
  {
    id: 'objective-c',
    name: 'Objective-C',
  },
  {
    id: 'objective-cpp',
    name: 'Objective-C++',
  },
  {
    id: 'ocaml',
    name: 'OCaml',
  },
  {
    id: 'pascal',
    name: 'Pascal',
  },
  {
    id: 'perl',
    name: 'Perl',
  },
  {
    id: 'php',
    name: 'PHP',
  },
  {
    id: 'plsql',
    name: 'PL/SQL',
  },
  {
    id: 'postcss',
    name: 'PostCSS',
  },
  {
    id: 'powerquery',
    name: 'PowerQuery',
  },
  {
    id: 'powershell',
    name: 'PowerShell',
  },
  {
    id: 'prisma',
    name: 'Prisma',
  },
  {
    id: 'prolog',
    name: 'Prolog',
  },
  {
    id: 'proto',
    name: 'Protocol Buffer 3',
  },
  {
    id: 'pug',
    name: 'Pug',
  },
  {
    id: 'puppet',
    name: 'Puppet',
  },
  {
    id: 'purescript',
    name: 'PureScript',
  },
  {
    id: 'python',
    name: 'Python',
  },
  {
    id: 'r',
    name: 'R',
  },
  {
    id: 'raku',
    name: 'Raku',
  },
  {
    id: 'razor',
    name: 'ASP.NET Razor',
  },
  {
    id: 'reg',
    name: 'Windows Registry Script',
  },
  {
    id: 'rel',
    name: 'Rel',
  },
  {
    id: 'riscv',
    name: 'RISC-V',
  },
  {
    id: 'rst',
    name: 'reStructuredText',
  },
  {
    id: 'ruby',
    name: 'Ruby',
  },
  {
    id: 'rust',
    name: 'Rust',
  },
  {
    id: 'sas',
    name: 'SAS',
  },
  {
    id: 'sass',
    name: 'Sass',
  },
  {
    id: 'scala',
    name: 'Scala',
  },
  {
    id: 'scheme',
    name: 'Scheme',
  },
  {
    id: 'scss',
    name: 'SCSS',
  },
  {
    id: 'shaderlab',
    name: 'ShaderLab',
  },
  {
    id: 'shellscript',
    name: 'Shell',
  },
  {
    id: 'shellsession',
    name: 'Shell Session',
  },
  {
    id: 'smalltalk',
    name: 'Smalltalk',
  },
  {
    id: 'solidity',
    name: 'Solidity',
  },
  {
    id: 'sparql',
    name: 'SPARQL',
  },
  {
    id: 'splunk',
    name: 'Splunk Query Language',
  },
  {
    id: 'sql',
    name: 'SQL',
  },
  {
    id: 'ssh-config',
    name: 'SSH Config',
  },
  {
    id: 'stata',
    name: 'Stata',
  },
  {
    id: 'stylus',
    name: 'Stylus',
  },
  {
    id: 'svelte',
    name: 'Svelte',
  },
  {
    id: 'swift',
    name: 'Swift',
  },
  {
    id: 'system-verilog',
    name: 'SystemVerilog',
  },
  {
    id: 'tasl',
    name: 'Tasl',
  },
  {
    id: 'tcl',
    name: 'Tcl',
  },
  {
    id: 'terraform',
    name: 'Terraform',
  },
  {
    id: 'tex',
    name: 'TeX',
  },
  {
    id: 'toml',
    name: 'TOML',
  },
  {
    id: 'tsv',
    name: 'TSV',
  },
  {
    id: 'tsx',
    name: 'TSX',
  },
  {
    id: 'turtle',
    name: 'Turtle',
  },
  {
    id: 'twig',
    name: 'Twig',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
  },
  {
    id: 'typst',
    name: 'Typst',
  },
  {
    id: 'v',
    name: 'V',
  },
  {
    id: 'vb',
    name: 'Visual Basic',
  },
  {
    id: 'verilog',
    name: 'Verilog',
  },
  {
    id: 'vhdl',
    name: 'VHDL',
  },
  {
    id: 'viml',
    name: 'Vim Script',
  },
  {
    id: 'vue',
    name: 'Vue',
  },
  {
    id: 'vue-html',
    name: 'Vue HTML',
  },
  {
    id: 'vyper',
    name: 'Vyper',
  },
  {
    id: 'wasm',
    name: 'WebAssembly',
  },
  {
    id: 'wenyan',
    name: 'Wenyan',
  },
  {
    id: 'wgsl',
    name: 'WGSL',
  },
  {
    id: 'wolfram',
    name: 'Wolfram',
  },
  {
    id: 'xml',
    name: 'XML',
  },
  {
    id: 'xsl',
    name: 'XSL',
  },
  {
    id: 'yaml',
    name: 'YAML',
  },
  {
    id: 'zenscript',
    name: 'ZenScript',
  },
  {
    id: 'zig',
    name: 'Zig',
  },
];
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { createFile } from './createFile';
import { createHash, encryptText, generateKey } from './crypto';
import { Button, Select, Spinner, TextArea } from '@radix-ui/themes';
import { FilePlusIcon } from '@radix-ui/react-icons';

export default function PasteBin() {
  const [text, setText] = useState('');
  const [lang, setLanguage] = useState('tsx');
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const submitFile = async () => {
    const [hash, key, highlightedCode] = await Promise.all([
      createHash(text),
      generateKey(),
      import('shiki').then(({ codeToHtml }) =>
        codeToHtml(text, {
          lang,
          theme: 'min-dark',
        })
      ),
    ]);
    const shortLink = hash.slice(0, 5);
    router.prefetch(`/f/${shortLink}`);
    const [{ encrypted, iv }, rawKey] = await Promise.all([
      encryptText(highlightedCode, key),
      crypto.subtle.exportKey('raw', key),
    ]);

    const publicKey = btoa(String.fromCharCode(...new Uint8Array(rawKey)));
    const cypherBase64 = btoa(
      String.fromCharCode(...new Uint8Array(encrypted))
    );

    await createFile(shortLink, cypherBase64);

    router.push(`/f/${shortLink}#${publicKey}$${iv}`);
  };

  return (
    <div className="relative h-screen grid place-items-center">
      <div className="z-50">
        <div className="flex gap-6 flex-col items-center">
          <h1 className="text-4xl text-neutral-200 font-mono">PasteBin</h1>
          <p className="text-neutral-500">Paste Text to share with others</p>

          <form
            className="flex relative z-10 flex-col items-center gap-4"
            onSubmit={async (e) => {
              e.preventDefault();
              startTransition(async () => await submitFile());
            }}
          >
            <TextArea
              name="code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your code here"
              className="font-mono min-w-[600px] max-w-full min-h-[800px] resize"
            />
            <div className="flex gap-2 items-center">
              <Select.Root
                defaultValue="typescript"
                onValueChange={(value) => setLanguage(value)}
              >
                <Select.Trigger />
                <Select.Content>
                  {bundledLanguagesInfo.map((lang) => (
                    <Select.Item key={lang.id} value={lang.id}>
                      {lang.name ?? lang.id}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>

              <Button disabled={pending}>
                <Spinner loading={pending}>
                  <FilePlusIcon />
                </Spinner>
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
