{
  description = "Svelte flake";

  inputs = {
    nixpkgs.url = "https://channels.nixos.org/nixpkgs-unstable/nixexprs.tar.zst";
  };

  outputs = inputs: {
    packages = builtins.mapAttrs (system: pkgs: {
      web = pkgs.buildNpmPackage {
        pname = "web";
        version = "0.1.0";
        src = ./.;
        npmDepsHash = pkgs.lib.fakeHash;
        installPhase = ''
          cp -r dist $out
        '';
      };

      default = inputs.self.packages.${system}.web;
    }) inputs.nixpkgs.legacyPackages;

    devShells = builtins.mapAttrs (system: pkgs: {
      default = pkgs.mkShell {
        packages = with pkgs; [
          nodejs
          pnpm
          typescript-language-server
          svelte-language-server
        ];
      };
    }) inputs.nixpkgs.legacyPackages;
  };
}
