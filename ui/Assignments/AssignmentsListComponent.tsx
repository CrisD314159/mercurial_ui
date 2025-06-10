import { Assignment } from "@/lib/types/entityTypes";
import { useEffect, useState } from "react";
import SubjectCarousel from "../Subject/Carousels/SubjectCarousel";
import AssignmentCard from "./Cards/AssignmentCard";
import { CircularProgress, List } from "@mui/material";

interface AssignmentsListComponentProps {
  assignments: Assignment[];
  isLoadingMore: boolean;
  title:string;
  hasMore: boolean;
  doneCard: boolean;
  ref: (node?: Element | null) => void;
  mutate: () => void;
}

export default function AssignmentsListComponent({
  assignments,
  hasMore,
  doneCard,
  isLoadingMore,
  title,
  ref,
  mutate,
}: AssignmentsListComponentProps) {
  const [filteredAssignments, setFilteredAssignments] = useState<Assignment[]>(assignments);

  console.log(hasMore);
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
    <div className="w-full h-full relative">
      <SubjectCarousel filterAssignments={filterAssignments} />
      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "45px",
          gap: "20px",
          alignItems: "center",
          height:'90%',
          overflowY:'scroll',
          paddingBottom:'100px'
        }}
      >
        {filteredAssignments.length > 0 ? (
          filteredAssignments.map((assignment) => (
            <AssignmentCard doneCard={doneCard} key={assignment.id} assignment={assignment} mutate={mutate} />
          ))
        ) : (
          <div>{title}</div>
        )}

        {hasMore && (
          <div ref={ref} className="mt-4 mb-8absolute bottom-20 h-10 w-10">
             <CircularProgress color="primary" hidden={!isLoadingMore}  />
          </div>
        )}
      </List>
    </div>
  );
}