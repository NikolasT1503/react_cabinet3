import React from "react";
import IssuesTable from "./IssuesTable";
import moment from 'moment';

const token = "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";

class Github extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      currentRepo: "angular-examen",
      issues: [],
    };
  }

  getRepos() {
    fetch("https://api.github.com/users/NikolasT1503/repos")
      .then((response) => response.json())
      .then((data) => {
        /* console.log(data); */
        const repos = data.map((item) => item.name);
        /* console.log(repos); */
        this.setState({ repos: repos });
      });
  }

  getIssues() {
    let tempIssues = [];
    let tempComments = [];
    fetch("https://api.github.com/repos/NikolasT1503/angular-examen/issues")
      .then((response) => response.json())
      .then((data) => {
          console.log('getIssues data', data);
          data.map((issue) => {
            let issue_number = issue.number
            let createdDate = moment(issue.created_at).format('DD.MM.YYYY HH:MM') ;
            
            let url = "https://api.github.com/repos/NikolasT1503/angular-examen/issues/"+issue_number+"/comments"
            //console.log(url);
            fetch(url)
                .then((resp) => resp.json())
                .then((comments) => {
                  //console.log('getIssues data comments', comments);
                  comments.map((comment) => {
                    let createdDateComment = moment(comment.created_at).format('DD.MM.YYYY HH:MM');
                    tempComments.push({...comment,createdDateComment})
                    return true
                  })
                  //tempComments.push(tmp_comment);
                  tempIssues.push({...issue, createdDate, comments: tempComments });
                  tempComments = [];
                });
            return true
          })
        })
    return tempIssues;
  }

  createIssue(title, body) {
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

  createIssueComment(issue_number, comment){
    const url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues/'+issue_number+'/comments';
    console.log('createIssueComment Проверка url', url);
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

  getIssueComments(issue_number) {
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

  resolveIssue(issue_number){
    console.log('resolveIssue Github', issue_number)
    let url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues/'+issue_number+'/lock';
    console.log('resolveIssue Проверка url', url);
    fetch(url, {
              method: "PUT",
              body: JSON.stringify({
                owner: "NikolasT1503",
                repo: "angular-examen",
                issue_number: issue_number,
                lock_reason: "resolved",
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: "Basic " + btoa("NikolasT1503:" + token),
              },
            }
        )
        .then(() => console.log('Issue '+ issue_number + ' решен'));
       
    url = 'https://api.github.com/repos/NikolasT1503/angular-examen/issues/'+issue_number;
    fetch(url, {
                  method: "PATCH",
                  body: JSON.stringify({
                    owner: "NikolasT1503",
                    repo: "angular-examen",
                    issue_number: issue_number,
                    state: "closed",
                  }),
                  headers: {
                    "Content-type": "application/json; charset=UTF-8",
                    Authorization: "Basic " + btoa("NikolasT1503:" + token),
                  },
                }
        )
        .then((response) => response.json())
        .then((json) => console.log(json));
    }

  componentDidMount() {
    const tmp_issues = this.getIssues();
    //console.log('tmp_issues', tmp_issues);
    this.setState({issues: tmp_issues});
  }

  handleClick = () => {
    this.getIssues();
  };

  render() {
    //console.log("Github render", this.state);
    //const history = this.props.history;
    return (
      <div>
        <IssuesTable
          issues={this.state.issues}
          createIssue={this.createIssue}
          createIsueComment={this.createIssueComment}
          editIssueComment={this.editIssueComment}
          resolveIssue={this.resolveIssue}
          getIssues = {this.getIssues}
        />
      </div>
    );
  }
}

export default Github;
