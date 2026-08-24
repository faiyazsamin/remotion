# Remotion projects

Each child folder contains one project and its compositions.

```text
src/
  components/              Shared React and SVG motion primitives
  projects/
    demo-fast/             Demo scenes and composition registration
      Composition.tsx
      index.ts
```

To add a project, create a folder under `src/projects`, keep its compositions local, and export its composition registrations from `index.ts`. Register those exports in `src/Root.tsx`.
