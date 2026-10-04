"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./library-explorer.module.css";

type Item = {
  slug:string;
  title:string;
  type:"article"|"exercise"|"recipe";
  description:string;
  tags:string[];
  readTime:string;
};

const filters = [
  ["all","TUDO"],
  ["article","LEARN"],
  ["exercise","EXERCISE"],
  ["recipe","KITCHEN"],
] as const;

export function LibraryExplorer({ items }: { items: Item[] }) {
  const [query,setQuery]=useState("");
  const [filter,setFilter]=useState<(typeof filters)[number][0]>("all");

  const results=useMemo(()=>{
    const q=query.trim().toLowerCase();
    return items.filter(item=>{
      if(filter!=="all" && item.type!==filter) return false;
      if(!q) return true;
      return [item.title,item.description,...item.tags].join(" ").toLowerCase().includes(q);
    }).slice(0,18);
  },[items,query,filter]);

  return (
    <section className={styles.explorer} aria-label="Pesquisar MyTrainX Library">
      <div className={styles.top}>
        <div>
          <span>SMART EXPLORE</span>
          <h2>ENCONTRA O QUE PRECISAS.</h2>
        </div>
        <label className={styles.search}>
          <span>⌕</span>
          <input
            value={query}
            onChange={event=>setQuery(event.target.value)}
            placeholder="Ex.: sono, agachamento, proteína, mobilidade..."
          />
        </label>
      </div>
      <div className={styles.filters}>
        {filters.map(([value,label])=>(
          <button key={value} type="button" onClick={()=>setFilter(value)} className={filter===value?styles.active:""}>
            {label}
          </button>
        ))}
        <small>{results.length} resultado{results.length===1?"":"s"} visíveis</small>
      </div>
      {(query || filter!=="all") && (
        <div className={styles.results}>
          {results.length ? results.map(item=>(
            <Link href={"/library/"+item.slug} key={item.slug}>
              <span>{item.type.toUpperCase()}</span>
              <b>{item.title}</b>
              <p>{item.description}</p>
              <div>{item.tags.slice(0,2).map(tag=><small key={tag}>{tag}</small>)}<em>{item.readTime} · ABRIR →</em></div>
            </Link>
          )):<div className={styles.empty}>Nenhum conteúdo corresponde à pesquisa atual.</div>}
        </div>
      )}
    </section>
  );
}
