# encoding: utf-8

Gem::Specification.new do |s|
  s.name          = "jekyll-theme-primer"
  s.version       = "0.1.1"
  s.authors       = ["GitHub, Inc."]
  s.email         = ["open-source@github.com"]
  s.homepage      = "https://github.com/benbalter/jekyll-theme-primer"
  s.summary       = "Primer is a Jekyll theme for GitHub Pages based on GitHub's Primer styles"

  s.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md)|$)))!i)
  end

  s.platform      = Gem::Platform::RUBY
  s.license       = "None"

  s.add_dependency "jekyll", "~> 3.3"
  s.add_development_dependency "rubocop", "~> 0.40"
end
