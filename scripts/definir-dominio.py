#!/usr/bin/env python3
"""Troca SEUDOMINIO.com.br pelo dominio real em index.html, robots.txt e sitemap.xml.
Uso:  python3 scripts/definir-dominio.py meudominio.com.br
"""
import sys, pathlib
if len(sys.argv) != 2:
    sys.exit("Uso: python3 scripts/definir-dominio.py meudominio.com.br")
dom = sys.argv[1].strip().lower().replace("https://", "").replace("http://", "").strip("/")
if dom.startswith("www."):
    dom = dom[4:]
base = pathlib.Path(__file__).resolve().parent.parent
n = 0
for nome in ("index.html", "robots.txt", "sitemap.xml"):
    f = base / nome
    t = f.read_text(encoding="utf-8")
    n += t.count("SEUDOMINIO.com.br")
    f.write_text(t.replace("SEUDOMINIO.com.br", dom), encoding="utf-8")
print(f"Pronto: {n} ocorrencias trocadas por {dom}")
