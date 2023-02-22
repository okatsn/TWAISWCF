using TWAISWCF
using Documenter

DocMeta.setdocmeta!(TWAISWCF, :DocTestSetup, :(using TWAISWCF); recursive=true)

makedocs(;
    modules=[TWAISWCF],
    authors="okatsn <okatsn@gmail.com> and contributors",
    repo="https://github.com/okatsn/TWAISWCF.jl/blob/{commit}{path}#{line}",
    sitename="TWAISWCF.jl",
    format=Documenter.HTML(;
        prettyurls=get(ENV, "CI", "false") == "true",
        canonical="https://okatsn.github.io/TWAISWCF.jl",
        edit_link="main",
        assets=String[],
    ),
    pages=[
        "Home" => "index.md",
    ],
)

deploydocs(;
    repo="github.com/okatsn/TWAISWCF.jl",
    devbranch="main",
)
