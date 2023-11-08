import fs from "node:fs";

const controller = {

    get: (req, res) => {
        fs.readFile("src/store/users.json", "utf-8", (err, data) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
          }
      
          const users = JSON.parse(data);
          const userId = req.params.Id; 
      
          if (userId) {
            const user = users.find((user) => user.Id === Number(userId));
      
            if (user) {
              return res.status(200).json({ user: user });
            } else {
              return res.status(404).json({ message: "User not found" });
            }
          } else {
            return res.status(200).json({ users: users });
          }
        });
      },

      post: (req, res) => {
        const { username, password, fullname } = req.body;
    
        if (!username || !password || !fullname) {
          return res
            .status(400)
            .json({ message: "Username/Password/Fullname is required" });
        }
    
        fs.readFile("src/store/users.json", "utf-8", (err, data) => {
          if (err) {
            return res.status(500).json({ message: err.message });
          }
          const users = JSON.parse(data);
          const user = {
            Id: users.length + 1,
            Fullname: fullname,
            Username: username,
            Password: password,
          };
          const updateData = [...users, user];
          fs.writeFile(
            "src/store/users.json",
            JSON.stringify(updateData),
            (err) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ message: err.message });
              } else {
                return res
                  .status(200)
                  .json({ message: "New user added succesfully." });
              }
            },
          );
        });
      },

      put: (req, res) => {
        const userId = req.params.Id;
        const { fullname, username, password } = req.body;
    
        if (!fullname && !username && !password) {
            return res
                .status(400)
                .json({ message: "At least one field (fullname, username, or password) is required for the update" });
        }
    
        fs.readFile("src/store/users.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
    
            const users = JSON.parse(data);
            const userIndex = users.findIndex((user) => user.Id === Number(userId));
    
            if (userIndex !== -1) {
                if (fullname) {
                    users[userIndex].Fullname = fullname;
                }
                if (username) {
                    users[userIndex].Username = username;
                }
                if (password) {
                    users[userIndex].Password = password;
                }
    
                fs.writeFile("src/store/users.json", JSON.stringify(users), (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ message: err.message });
                    } else {
                        return res
                            .status(200)
                            .json({ message: `User with ID ${userId} updated successfully.` });
                    }
                });
            } else {
                return res.status(404).json({ message: "User not found" });
            }
        });
    },

    delete: (req, res) => {
      const userId = req.params.Id;
  
      fs.readFile("src/store/users.json", "utf-8", (err, data) => {
        if (err) {
          return res.status(500).json({ message: err.message });
        }
  
        const users = JSON.parse(data);
        const userIndex = users.findIndex((user) => user.Id === Number(userId));
  
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
  
          fs.writeFile("src/store/users.json", JSON.stringify(users), (err) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ message: err.message });
            } else {
              return res.status(200).json({ message: `User with ID ${userId} deleted successfully.` });
            }
          });
        } else {
          return res.status(404).json({ message: "User not found" });
        }
      });
    },
};

export default controller;