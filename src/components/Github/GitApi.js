export const token = "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";

export function getRepos() {
  fetch("https://api.github.com/users/NikolasT1503/repos")
    .then((response) => response.json())
    .then((data) => {
      /* console.log(data); */
      const repos = data.map((item) => item.name);
      /* console.log(repos); */
      this.setState({ repos: repos });
    });
}

export function getIssues() {
  let tempIssues = [];
  fetch("https://api.github.com/repos/NikolasT1503/angular-examen/issues")
    .then((response) => response.json())
    .then((data) => {
      console.log("getIssues data", data);
      data.map((issue) => {
        let issue_number = issue.number;
        let createdDate = moment(issue.created_at).format("DD.MM.YYYY HH:MM");

        let url =
          "https://api.github.com/repos/NikolasT1503/angular-examen/issues/" +
          issue_number +
          "/comments";
        console.log(url);
        fetch(url)
          .then((resp) => resp.json())
          .then((comments) => {
            let createdDateComment = moment(comments.created_at).format(
              "DD.MM.YYYY HH:MM"
            );
            /* console.log('comments', comments); */
            let tempComments = [];
            tempComments.push({ ...comments, createdDateComment });
            tempIssues.push({ ...issue, createdDate, tempComments });
          });
        return true;
      });
    });
  this.setState({ issues: tempIssues });
}

export function createIssue(title, body) {
  console.log("Github createIssue", title, body);
  fetch("https://api.github.com/repos/NikolasT1503/angular-examen/issues", {
    method: "POST",
    body: JSON.stringify({
      owner: "NikolasT1503",
      repo: "angular-examen",
      title: title,
      body: body,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Basic " + btoa("NikolasT1503:" + token),
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function createIssueComment(issue_number, comment) {
  const url =
    "https://api.github.com/repos/NikolasT1503/angular-examen/issues/" +
    issue_number +
    "/comments";
  console.log("createIssueComment Проверка url", url);
  fetch(url, {
    method: "POST",
    body: JSON.stringify({
      owner: "NikolasT1503",
      repo: "angular-examen",
      issue_Number: issue_number,
      body: comment,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Basic " + btoa("NikolasT1503:" + token),
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}

export function getIssueComments(issue_number) {
  console.log("Github getIssueComments", issue_number);
  fetch(
    "https://api.github.com/repos/NikolasT1503/angular-examen/issues/" +
      issue_number +
      "/comments"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log("getIssueComments", data);
    });
}

export function resolveIssue(issue_number) {
  console.log("resolveIssue Github", issue_number);
  let url =
    "https://api.github.com/repos/NikolasT1503/angular-examen/issues/" +
    issue_number +
    "/lock";
  console.log("resolveIssue Проверка url", url);
  fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      owner: "NikolasT1503",
      repo: "angular-examen",
      issue_Number: issue_number,
      lock_reason: "resolved",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Basic " + btoa("NikolasT1503:" + token),
    },
  })
    .then((response) => response.json())
    .then((json) => console.log("Залочено", json));

  url =
    "https://api.github.com/repos/NikolasT1503/angular-examen/issues/" +
    issue_number;
  console.log("resolveIssue Проверка url PATCH", url);
  fetch(url, {
    method: "PATCH",
    body: JSON.stringify({
      owner: "NikolasT1503",
      repo: "angular-examen",
      issue_Number: issue_number,
      state: "closed",
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: "Basic " + btoa("NikolasT1503:" + token),
    },
  })
    .then((response) => response.json())
    .then((json) => console.log(json));
}
