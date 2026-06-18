import { useState } from "react";
import { BookOpen, Terminal, Copy, Check, Key, HelpCircle, Layers, Code, Play } from "lucide-react";
import { DOC_PAGES } from "../data";
import { DocPage } from "../types";

export default function DocsView() {
  const [activeDocId, setActiveDocId] = useState<string>("auth"); // default to Authentication matching screenshot
  const [activeCodeTab, setActiveCodeTab] = useState<"curl" | "node" | "python">("curl");
  const [copiedText, setCopiedText] = useState(false);

  const activeDoc = DOC_PAGES.find(p => p.id === activeDocId) || DOC_PAGES[1];

  // Group documentation pages by category for sidebar navigation
  const categories = Array.from(new Set(DOC_PAGES.map(p => p.category)));

  const handleCopyCode = () => {
    let codeStr = "";
    if (activeCodeTab === "curl") codeStr = activeDoc.codeSamples.curl;
    else if (activeCodeTab === "node") codeStr = activeDoc.codeSamples.node;
    else codeStr = activeDoc.codeSamples.python;

    navigator.clipboard.writeText(codeStr);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col xl:flex-row relative -mx-6 lg:-mx-10 min-h-[calc(100vh-5rem)]">
      
      {/* 1. Left Local Side Navigation (Docs Directory Menu Tree) */}
      <aside className="w-full xl:w-56 flex-shrink-0 border-b xl:border-b-0 xl:border-r border-emerald-glow/10 p-6 xl:sticky xl:top-20 xl:h-[calc(100vh-5rem)] overflow-y-auto bg-[#020617]/40">
        <div className="font-mono text-[10px] text-emerald-glow mb-6 uppercase tracking-wider font-bold">
          API REFERENCE
        </div>
        
        <nav className="space-y-6">
          {categories.map((cat) => {
            const pagesInCat = DOC_PAGES.filter(p => p.category === cat);
            return (
              <div key={cat}>
                <h4 className="font-headline text-xs font-semibold text-on-surface mb-2 tracking-wide uppercase">
                  {cat}
                </h4>
                <ul className="space-y-1">
                  {pagesInCat.map((page) => {
                    const isSelected = activeDocId === page.id;
                    return (
                      <li key={page.id}>
                        <button
                          onClick={() => {
                            setActiveDocId(page.id);
                            setCopiedText(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 font-sans text-xs rounded transition-all cursor-pointer block ${
                            isSelected
                              ? "text-emerald-glow bg-emerald-glow/5 border-l-2 border-emerald-glow font-semibold"
                              : "text-on-surface-variant hover:text-on-surface hover:bg-surface-variant/30"
                          }`}
                        >
                          {page.title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>

      {/* 2. Center Column: Prose Content API detailed tables */}
      <div className="flex-1 p-6 lg:p-10 max-w-4xl mx-auto xl:mx-0 pb-32">
        
        {/* Mobile Dropdown Category Navigation Selector */}
        <div className="xl:hidden mb-6">
          <select
            value={activeDocId}
            onChange={(e) => setActiveDocId(e.target.value)}
            className="w-full bg-[#020617] border border-emerald-glow/20 rounded-lg p-3 text-on-surface font-sans text-xs focus:border-emerald-glow focus:ring-1 focus:ring-emerald-glow/25"
          >
            {DOC_PAGES.map(page => (
              <option key={page.id} value={page.id}>
                {page.category} / {page.title}
              </option>
            ))}
          </select>
        </div>

        {/* API active node badge */}
        <div className="mb-4 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10B981]"></span>
          </span>
          <span className="font-mono text-[9px] text-[#10B981] uppercase tracking-widest font-bold">
            API V2.4 Active Node
          </span>
        </div>

        {/* Title & Introduction */}
        <h1 className="font-headline text-3xl font-bold text-on-surface mb-3 tracking-tight">
          {activeDoc.title}
        </h1>
        <p className="text-sm font-sans text-on-surface-variant/90 leading-relaxed mb-6 max-w-2xl">
          {activeDoc.intro}
        </p>

        {/* Descriptive prose callouts */}
        <div className="bg-surface-variant/15 border border-emerald-glow/10 rounded-xl p-5 mb-8 backdrop-blur-sm">
          <h5 className="font-headline font-semibold text-sm text-on-surface mb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-glow" />
            Core Integration Specs
          </h5>
          <p className="text-xs text-on-surface-variant/90 font-sans leading-relaxed">
            {activeDoc.description}
          </p>
        </div>

        {/* Conditional REST parameters layout details */}
        {activeDoc.endpoint && (
          <div className="space-y-6">
            <div className="h-px w-full bg-gradient-to-r from-emerald-glow/0 via-emerald-glow/15 to-emerald-glow/0 my-8" />
            
            <h3 className="font-headline text-lg font-semibold text-on-surface mb-4">
              HTTP Rest Endpoint
            </h3>

            {/* HTTP Path Badge details */}
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-emerald-glow/10 border border-emerald-glow/30 text-emerald-glow font-mono text-[10px] font-bold uppercase rounded tracking-wider">
                {activeDoc.endpoint.method}
              </span>
              <code className="font-mono text-xs text-on-surface/90 bg-[#0B0F1A] px-3 py-1.5 rounded border border-surface-variant/60">
                {activeDoc.endpoint.url}
              </code>
            </div>

            {activeDoc.parameters && activeDoc.parameters.length > 0 && (
              <div>
                <h4 className="font-headline text-sm font-semibold text-on-surface mb-4">
                  Body Parameters
                </h4>

                {/* Parameters Description Table */}
                <div className="overflow-x-auto rounded-xl border border-emerald-glow/10 bg-[#0B0F1A]/20">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                    <thead>
                      <tr className="border-b border-emerald-glow/10 bg-surface-variant/30 text-xs font-mono text-on-surface-variant uppercase tracking-wider">
                        <th className="py-3 px-6 h-12 w-1/3">Parameter</th>
                        <th className="py-3 px-6 h-12">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-glow/5 font-sans text-xs text-on-surface">
                      {activeDoc.parameters.map((param) => (
                        <tr key={param.name} className="hover:bg-surface-variant/5 transition-colors group">
                          <td className="py-4 px-6 align-top">
                            <div className="font-mono font-bold text-emerald-glow group-hover:text-[#00ffa3] transition-colors">
                              {param.name}
                            </div>
                            <div className="font-mono text-[10px] text-on-surface-variant/65 mt-1">
                              {param.type}
                              {param.required && (
                                <span className="text-[#ffb4ab] ml-1.5 font-sans uppercase text-[8px] tracking-wider bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 px-1 py-0.5 rounded">
                                  required
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6 align-top font-sans text-on-surface-variant leading-relaxed">
                            {param.description}
                            {param.defaultValue && (
                              <div className="font-mono text-[9px] text-[#64748B] mt-1.5">
                                Default: {param.defaultValue}
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* 3. Right Rail Code Panel Block */}
      <div className="w-full xl:w-[450px] 2xl:w-[500px] flex-shrink-0 bg-[#0B0F1A] border-t xl:border-t-0 xl:border-l border-emerald-glow/10 sticky bottom-0 xl:top-20 xl:h-[calc(100vh-5rem)] flex flex-col z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Code Tabs selector Header */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-surface-variant/40 bg-[#020617]/80 backdrop-blur-sm">
          <div className="flex gap-4">
            {(["curl", "node", "python"] as const).map((tab) => {
              const tabLabels = { curl: "cURL", node: "Node.js", python: "Python" };
              const isSelected = activeCodeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveCodeTab(tab);
                    setCopiedText(false);
                  }}
                  className={`font-mono text-[10px] uppercase tracking-wider pb-4 pt-4 transition-all relative font-bold cursor-pointer ${
                    isSelected ? "text-emerald-glow" : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {tabLabels[tab]}
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-glow" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Copy Snippet block */}
          <button
            onClick={handleCopyCode}
            className="text-on-surface-variant hover:text-emerald-glow p-1.5 rounded-lg hover:bg-surface-variant/40 transition-colors flex items-center gap-1 cursor-pointer"
            title="Copy command code"
          >
            {copiedText ? (
              <>
                <Check className="w-4 h-4 text-emerald-glow" />
                <span className="font-mono text-[9px] text-emerald-glow tracking-wider uppercase font-bold">COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="font-mono text-[9px] uppercase tracking-wider">copy</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block Container */}
        <div className="flex-1 overflow-y-auto p-5 font-mono text-[11px] leading-relaxed relative bg-[#060A13]">
          
          {/* Subtle radar background light glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(0,255,163,0.06),transparent_65%)] pointer-events-none" />

          {/* Visual Code Output with Syntax Highlights */}
          <div className="relative z-10 text-on-surface-variant/90 max-w-full">
            <pre className="whitespace-pre-wrap word-break">
              <code>
                {activeCodeTab === "curl" && activeDoc.codeSamples.curl}
                {activeCodeTab === "node" && activeDoc.codeSamples.node}
                {activeCodeTab === "python" && activeDoc.codeSamples.python}
              </code>
            </pre>
          </div>

          {/* Response Payload Block */}
          {activeDoc.responseSnippet && (
            <div className="mt-8 pt-6 border-t border-surface-variant/40 relative z-10">
              <div className="font-mono text-[9px] text-[#10B981] mb-3 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#10B981]"></span>
                </span>
                Response (200 OK)
              </div>
              
              <div className="p-4 rounded-lg bg-[#010307] border border-surface-variant/40 select-all overflow-x-auto">
                <pre className="text-on-surface-variant text-[10.5px]">
                  <code>
                    {activeDoc.responseSnippet}
                  </code>
                </pre>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
