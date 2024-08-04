import { useState, useEffect } from "react";
import axios from "axios";

const Performance = () => {
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/p/website", {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWIwZTc1OGZlNGZhYjVlMThjNTJjZiIsImlhdCI6MTcyMjQ4NjM5MywiZXhwIjoxNzIyNDg5OTkzfQ.Y4ZkYirmYZlY9H9LAazHnALyfb3FnUDmhJjiNb9Qjs4`,
          },
        });

        setWebsites(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWebsites();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Website Performance</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Website</th>
            <th>Status</th>
            <th>Last Checked</th>
          </tr>
        </thead>
        <tbody>
          {websites.map((website) => (
            <tr key={website._id}>
              <td>{website.website}</td>
              <td>{website.status}</td>
              <td>{new Date(website.lastChecked).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Performance;
