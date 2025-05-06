import { Assignment } from "@/app/lib/types/entityTypes";
import { useEffect, useState } from "react";
import SubjectCarousel from "../Todo/SubjectCarousel";
import AssignmentCard from "./Cards/AssignmentCard";
import { CircularProgress, List } from "@mui/material";

interface AssignmentsListComponentProps {
  assignments: Assignment[];
  isLoadingMore: boolean;
  hasMore: boolean;
  ref: (node?: Element | null) => void;
  mutate: () => void;
}

export default function AssignmentsListComponent({
  assignments,
  hasMore,
  isLoadingMore,
  ref,
  mutate,
}: AssignmentsListComponentProps) {
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>(assignments);


  useEffect(() => {
    setFilteredAssignments(assignments);
  }, [assignments]);

  const filterAssignments = (id: number) => {
    if (id === 0) {
      setFilteredAssignments(assignments);
    } else {
      setFilteredAssignments(assignments.filter((a) => a.subjectId === id));
    }
  };

  return (
    <div className="w-full h-full">
      <SubjectCarousel filterAssignments={filterAssignments} />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "45px",
          gap: "20px",
          alignItems: "center",
          height:'90%',
          overflowY:'scroll'
        }}
      >
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} mutate={mutate} />
          ))
        ) : (
          <div>{"You don't have any pending assignments"} 🥳</div>
        )}
      </List>
      {hasMore && (
        <div ref={ref} className="mt-4 mb-8">
          {isLoadingMore && <CircularProgress color="info" />}
        </div>
      )}
    </div>
  );
}