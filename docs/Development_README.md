# swoPdotz


## Minimum Viable Product (MVP)

swoPdotz is a fun, addictive javascript game inspired by Bejeweled, Candy Crush, and Dots.

- [x] Hosting online
- [x] Bug-free Gameplay
- [x] Intuitive UI/UX
- [x] Clean and elegant CSS styling
- [x] Organized file structure
- [x] Tile swapping
  - [x] Easy to use, clear
  - [x] Well Styled
- [x] "Explosions"
  - [x] Explode in correct direction
  - [x] Styled with clean transition
- [x] Different Tiles/Symbols
  - [x] Have different explosion functions
  - [x] All Styled appropriately and cohesively
- [ ] BONUS: Add high score persistence with small database and backend


## Technologies, Libraries, APIs

 - Javascript
 - React.js
 - SASS
 - HTML
 - BONUS: SQL

swoPdotz will be implementing the technologies listed above to implement a seamless web app that is easy to use, quick, and exciting. The challenges will be in making gameplay smooth and making sure the simplicity of the design doesn't make the game look too juvenile. Instead, the game should design should be elegant, with colors reminiscent of Dots.


## Wireframes

Entry:
![views](Wireframes/IMG_3564.JPG)

Main Gameplay:
![views](Wireframes/IMG_3563.JPG)

Tile Explosion:
![views](Wireframes/IMG_3565.JPG)


## Backend

The backend will be a bonus allowing users to save their high scores. It will consist of one table:

### high_scores
column name    | data type  | details
---------------|------------|-----------------------
id             | integer    | not null, primary key
username       | string     | not null
score          | integer    |


## Implementation Timeline

### Day One

- [x] Create file structure
- [x] Assemble colors and symbols
- [x] Implement basic tile swapping
- [x] Implement simple and elegant CSS

### Day Two

- [x] Develop game play
  - [x] Restrict tile swapping to appropriate pieces
  - [x] Add at least two different types of combinations
  - [x] Create explosion CSS
- [x] Adjust CSS, ensuring modernity

### Day Three

- [x] Develop game play
  - [ ] Add goals/obstacles
  - [x] Add levels/algorithm for levels to be created dynamically
  - [x] Add new types of combinations/explosions
- [x] Continue to perfect CSS

### BONUS

- [ ] Add backend
- [ ] Create high score table
- [ ] Make sure game works on mobile devices


## Final Checklist

### Live Project

- [x] Includes links to your Portfolio, Github and LinkedIn.
- [x] Landing page/modal with obvious, clear instructions.
- [x] Interactivity of some kind.
- [x] Well styled, clean frontend.
- [ ] If it has music, the option to mute or stop it.
- [x] Hosted from your portfolio site on GitHub pages.

### Repo and README

- [x] Link to live version.
- [ ] Instructions on how to play/use the project.
- [ ] List of techs/languages/plugins/APIs used.
- [ ] Technical implementation details with code snippets (make sure it looks good).
- [ ] To-dos/future features.
- [ ] No .DS_Stores / debuggers / console.logs.
- [ ] Organize into /assets and /lib.
