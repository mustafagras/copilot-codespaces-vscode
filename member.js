function skillsMember() {
  let member = {
    name: "John",
    age: 20,
    skills: ["HTML", "CSS", "JS"],
  };
  let skills = member.skills;
  for (let skill of skills) {
    console.log(skill);
  }
}