import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Typography, Box } from "@mui/material";

const QuizPolls = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchPollData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_MAIN_URL}/api/poll`);
        setQuestions(response.data.slice(0, 4));
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
      await axios.post(`${import.meta.env.VITE_MAIN_URL}/api/vote`, {
        questionIndex,
        optionIndex,
      });
    } catch (error) {
      console.error(" vote error:", error);
    }
  };

  return (
    <Box sx={{ my: 10 }}>
      <Typography variant="h3" textAlign={"center"} fontWeight={"bold"}>
        Votes
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 10,

          padding: 4,
        }}
      >
        {questions.map((q, index) => (
          <Box sx={{ height: 300, width: 600 }} key={index}>
            <Box>
              <Typography variant="h5" sx={{}}>
                {q.question}
              </Typography>
            </Box>
            <Box sx={{}}>
              {q.options.map((option, optionIndex) => (
                <Box sx={{ my: 2 }} key={optionIndex}>
                  <Button
                    variant="outlined"
                    sx={{
                      bgcolor: "#d1d1d1",
                      px: 4,
                      py: "5px",
                      color: "black",
                      fontWeight: "bold",
                      ":hover": { bgcolor: "#8dcc78" },
                    }}
                    onClick={() => handleVote(index, optionIndex)}
                  >
                    {option} -{" "}
                    <Typography sx={{ margin: "0px 6px" }}>
                      ( {q.votes[optionIndex]} ) votes
                    </Typography>
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default QuizPolls;
