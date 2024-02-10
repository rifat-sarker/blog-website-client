import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";

const QuizPolls = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/poll");
        setQuestions(response.data);
      } catch (error) {
        console.error(" data:", error);
      }
    };
    fetchPollData();
  }, []);

  const handleVote = async (questionIndex, optionIndex) => {
    try {
      const updatedQuestions = [...questions];
      updatedQuestions[questionIndex].votes[optionIndex]++;
      setQuestions(updatedQuestions);
      await axios.post("http://localhost:5000/api/vote", {
        questionIndex,
        optionIndex,
      });
    } catch (error) {
      console.error(" vote error:", error);
    }
  };

  return (
    <div className="mt-12 grid mx-12 md:grid-cols-2 lg:grid-cols-2 gap-12">
      {questions.map((q, index) => (
        <div className="" key={index}>
          <Typography variant="h5" sx={{margin: "16px 0px",  height:"80px"}} >{q.question}</Typography>
          <Box className="space-y-4">
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                
                  <Button variant="contained"
                    
                    onClick={() => handleVote(index, optionIndex)}
                  >
                    {option} - <Typography sx={{margin:"0px 6px"}}>( {q.votes[optionIndex]} ) votes</Typography>
                  </Button>
               
              </div>
            ))}
          </Box>
        </div>
      ))}
    </div>
  );
};

export default QuizPolls;
