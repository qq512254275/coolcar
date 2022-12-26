package main

import (
	authpb "coolcar/auth/api/gen/v1"
	"coolcar/auth/auth"
	"log"
	"net"

	"go.uber.org/zap"
	"google.golang.org/grpc"
)

func main() {
	logger, err := zap.NewDevelopment()
	if err != nil {
		log.Fatalf("cannot create logger: %v", err)
	}
	lis, err := net.Listen("tcp", ":8080")
	if err != nil {
		logger.Fatal("cannot listen", zap.Error(err))
	}
	s := grpc.NewServer()
	authpb.RegisterAuthServiceServer(s, &auth.Service{
		Logger: logger,
	})

	err = s.Serve(lis)
	if err != nil {
		logger.Fatal("cannot server", zap.Error(err))
	}
}
