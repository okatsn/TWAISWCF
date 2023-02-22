using TWAISWCF
using Documenter

DocMeta.setdocmeta!(TWAISWCF, :DocTestSetup, :(using TWAISWCF); recursive=true)

makedocs(;
    modules=[TWAISWCF],
    authors="okatsn <okatsn@gmail.com> and contributors",
    repo="https://github.com/okatsn/TWAISWCF/blob/{commit}{path}#{line}",
    sitename="TWAISWCF",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://okatsn.github.io/TWAISWCF",
        edit_link="main",
        assets=String[],
    ),
    pages=[
        "Introduction" => "intro.md",
        "Library" => "index.md",
        "SWCForecastBase" => "swcfb.md",
    ],
)

deploydocs(;
    repo="github.com/okatsn/TWAISWCF",
    devbranch="main",
)
