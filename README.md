# ArkanoidG (Java Swing)

A compact Arkanoid-style game implemented in Java Swing. The project centers on `GameBoard` which runs the game loop and coordinates entities. Entities implement a shared `GameObject` API and extend `AbstractGameObject` for common behavior.

## Build & run
From the project root:

```bash
javac -d build com/mycompany/arkanoidg/*.java
java -cp build com.mycompany.arkanoidg.ArkanoidG
```

## Project structure (key files)
- `com/mycompany/arkanoidg/ArkanoidG.java` — application entry (creates JFrame + GameBoard).
- `com/mycompany/arkanoidg/GameBoard.java` — main game coordinator: game loop (`Timer`), input handling, collision logic, entity management, and rendering.
- `com/mycompany/arkanoidg/GameState.java` — enum of game states (`MENU`, `PLAYING`, `PAUSED`, `GAME_OVER`, `LEVEL_COMPLETE`).
- `com/mycompany/arkanoidg/HighScoreManager.java` — simple high-score persistence (reads/writes `highscore.dat`).

### Abstraction & core types
- `com/mycompany/arkanoidg/GameObject.java` — interface declaring `update()` and `draw(Graphics)`.
- `com/mycompany/arkanoidg/AbstractGameObject.java` — abstract base class providing shared `protected int x,y`, constructors, `getX()/getY()/setPosition(...)`, default `update()`, and abstract `draw(Graphics)`.

### Entities
- `Ball.java` — moving ball, velocity (`dx`, `dy`), bounce logic, speed control, `draw()`.
- `Brick.java` — static obstacles with `health` and `BrickType` enum; `hit()` reduces health and may yield power-ups.
- `Paddle.java` — player-controlled paddle, handles input, can expand/shrink, shield, fire lasers/gun.
- `PowerUp.java` — falling pickups; types (expand, multi, laser, gun, catch, life, etc.) and durations; `GameBoard.applyPowerUp` applies effects.
- `Enemy.java` — moving/bobbing enemy (boss), with health and `tryShoot()` to spawn `EnemyShot`.
- `EnemyShot.java` — enemy projectile.
- `LaserShot.java` — player-fired laser projectile.

## Relationships & patterns
- Inheritance: all entities extend `AbstractGameObject` which implements `GameObject`.
- Composition: `GameBoard` contains lists of entities (`bricks`, `enemies`, `powerUps`, `lasers`, `enemyShots`, `extraBalls`) and coordinates interactions.
- Polymorphism: `GameBoard` up-casts entities to `GameObject` and calls `update()` for unified per-frame behavior.
- Down-casting: `GameBoard` uses `instanceof` (pattern matching) to access `Enemy`-specific APIs like `tryShoot()` when needed.

## Runtime flow
1. `ArkanoidG.main()` creates `JFrame` and adds `GameBoard`.
2. `GameBoard` starts a `Timer` that calls `actionPerformed()` periodically.
3. `actionPerformed()` updates entities (`update()`), handles collisions, spawns/removes objects, updates timers and state, then calls `repaint()`.
4. `paintComponent()` delegates to `draw()` to render the game and UI.

## Suggestions / next steps
- Unify update/draw ordering by keeping a single ordered `List<AbstractGameObject>` in `GameBoard` (allows explicit layering).
- Introduce capability interfaces (e.g., `Shooter`, `Collidable`) to avoid `instanceof` checks.
- Promote shared fields (size, velocity, health) into intermediate abstract subclasses where appropriate.
- Add Javadoc comments and run `javadoc` to produce browsable documentation.

## Notes
- Assets (e.g., `cover.png`) are loaded from resources or working directory if present.
- The game saves high score to `highscore.dat` in the working directory.

---
Generated README by the development assistant. If you want a more detailed Javadoc-style documentation or an HTML export, tell me which format you prefer.
